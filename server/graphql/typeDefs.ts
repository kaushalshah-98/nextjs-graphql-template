import path from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema, lexicographicSortSchema, print } from 'graphql';

/* Load all gql files */
const typesArray = loadFilesSync(path.join('./**/*.gql'));

/** Merge all gql type definitions */
const typeDefs = mergeTypeDefs(typesArray);

/** Convert schema to string */
const schema = print(typeDefs);

/** build a GraphQLSchema */
const schemaV2 = buildSchema(schema);

/** sorted copy of the given GraphQLSchema */
const sortedSchema = lexicographicSortSchema(schemaV2);

export default sortedSchema;
