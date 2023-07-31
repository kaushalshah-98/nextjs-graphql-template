/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { fieldsMap } from 'graphql-fields-list';
import type { GraphQLResolveInfo } from 'graphql/type/definition';
import { RelationExpression, Relations } from 'objection';
import { Logger, titleCase } from '../../utils';
import { CacheModel, CacheQueryBuilder } from '../models';

function buildGraphExp<M extends CacheModel>(obj: IProjection, path = '') {
  const graph: RelationExpression<M> = {};
  for (const subfield in obj.subfields) {
    const modifierKey = `select${path}${titleCase(subfield)}`;
    graph[subfield] = {
      $modify: [modifierKey],
    };
    const subGraph = buildGraphExp(obj.subfields[subfield], titleCase(subfield));
    obj.subfields[subfield].graphExp = subGraph;
    obj.subfields[subfield].graphExpKeys = Object.keys(subGraph);
    if (Object.keys(subGraph).length !== 0) {
      graph[subfield] = {
        ...graph[subfield],
        ...subGraph,
      };
    }
  }
  return graph as Record<string, unknown>;
}

function buildModifiers(obj: IProjection, path = '') {
  let modifiers = {};
  for (const subfield in obj.subfields) {
    const modifierKey = `select${path}${titleCase(subfield)}`;
    const { tableName } = obj.subfields[subfield].model;
    modifiers[modifierKey] = (builder: CacheQueryBuilder<any, any>) => {
      // Ensure to have tableName.key for un-ambiguous SELECT queries
      builder.select(obj.subfields[subfield].selectKeys.map((key) => `${tableName}.${key}`));
    };
    const subModifiers = buildModifiers(obj.subfields[subfield], titleCase(subfield));
    obj.subfields[subfield].modifiers = subModifiers;
    modifiers = {
      ...modifiers,
      ...subModifiers,
    };
  }
  return modifiers;
}

interface IProjection {
  selectKeys: string[];
  hasDynamicKeys: boolean;
  model: typeof CacheModel;
  graphExp: Record<string, unknown>;
  graphExpKeys: string[];
  modifiers: any | null;
  subfields: { [key: string]: IProjection };
}

export function getProjection(info: GraphQLResolveInfo, model: typeof CacheModel, path = '') {
  let modelRelations: Relations;
  // hack around initial getRelations() call erroring for through relations
  try {
    modelRelations = model.getRelations();
  } catch (e) {
    modelRelations = model.getRelations();
  }
  const modelRelationKeys = Object.keys(modelRelations);
  const modelDynamicKeys = model.dynamicFields;
  const selectKeys: string[] = [];
  const graphExpArr: string[] = [];
  const resolverFieldsMap = fieldsMap(info, { path });
  let hasDynamicKeys = false;
  for (const key in resolverFieldsMap) {
    if (key === '__typename') {
      continue;
    } else if (modelDynamicKeys.includes(key)) {
      hasDynamicKeys = true;
      continue;
    } else if (modelRelationKeys.includes(key)) {
      graphExpArr.push(key);
    } else {
      selectKeys.push(key);
    }
  }
  const projection: IProjection = {
    selectKeys,
    hasDynamicKeys,
    model,
    graphExp: {},
    graphExpKeys: [],
    modifiers: {},
    subfields: {},
  };
  // process selectFields
  for (const key of graphExpArr) {
    const subPath = path !== '' ? `${path}.${key}` : key;
    const subProjection = getProjection(
      info,
      modelRelations[key].relatedModelClass as typeof CacheModel,
      subPath
    );
    projection.subfields[key] = subProjection;
  }
  // process relations
  const hasSubfields = Object.keys(projection.subfields).length !== 0;
  if (path === '' && hasSubfields) {
    projection.graphExp = buildGraphExp(projection);
    projection.graphExpKeys = Object.keys(projection.graphExp);
    projection.modifiers = buildModifiers(projection);
  }
  Logger.debug(projection);
  return projection;
}

// TODO: consider converting expandMissingSelect to take a graph and expand relations as well
// interface IGraphStructure {
//   [key: string]: boolean | IGraphStructure;
// }

// function checkKeys(parent: CacheModel, structure: object) {
//   const graph = {};
//   for (const k in structure) {
//     if (!parent.hasOwnProperty(k)) {
//       if (typeof structure[k] === 'boolean') {
//         graph[k] = true;
//       } else {
//         graph[k] = { ...structure[k] };
//       }
//     } else {
//       if (typeof structure[k] !== 'boolean') {
//         const missingSubKeys = checkKeys(parent[k], structure[k]);
//         if (Object.keys(missingSubKeys).length !== 0) {
//           graph[k] = { ...missingSubKeys };
//         }
//       }
//     }
//   }
//   return graph;
// }

export async function expandMissingSelect<T extends CacheModel>(
  model: typeof CacheModel,
  parent: CacheModel,
  keys: string[]
): Promise<T> {
  const expandSelect: string[] = [];
  for (const k of keys) {
    if (!parent.hasOwnProperty(k)) {
      expandSelect.push(k);
    }
  }
  if (expandSelect.length !== 0) {
    if (parent instanceof CacheModel) {
      parent = await parent.$query().select(expandSelect);
    } else {
      const { id } = parent as any;
      parent = (await model.query().findById(id).select(expandSelect)) as CacheModel;
    }
  }
  return parent as unknown as T;
}
