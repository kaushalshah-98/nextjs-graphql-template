import { ApolloError } from 'apollo-server-micro';
import type { GraphQLResolveInfo } from 'graphql/type/definition';
import { getProjection } from '../../../db';
import { IContext } from '../../../types';

export async function members(
  _parent: null,
  _args: null,
  { db }: IContext,
  info: GraphQLResolveInfo
) {
  try {
    const { selectKeys, graphExp, graphExpKeys, modifiers } = getProjection(info, db.MainMember);

    const query = db.MainMember.query();

    if (graphExpKeys.length !== 0) {
      query.withGraphFetched(graphExp).modifiers(modifiers);
    }

    const data = await query.select(selectKeys);
    return data;
  } catch (e) {
    console.error('query.members.members()', e);
    throw new ApolloError((e as Error)?.message);
  }
}
