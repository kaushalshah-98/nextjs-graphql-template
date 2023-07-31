import type { GraphQLResolveInfo } from 'graphql/type/definition';
import { IContext } from '../../../types';

export function hello(
  _parent: null,
  _args: null,
  _ctx: IContext,
  _info: GraphQLResolveInfo
): string {
  // eslint-disable-next-line no-useless-catch
  try {
    return `Hello ${new Date().toLocaleTimeString()}`;
  } catch (e) {
    throw e;
  }
}
