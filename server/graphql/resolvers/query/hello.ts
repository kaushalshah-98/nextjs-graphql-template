// import type { GraphQLResolveInfo } from 'graphql/type/definition';
import { IContext } from '../../../types';
import { publishOnChange } from '../publishers';

export async function hello(
  _parent: null,
  _args: null,
  _ctx: IContext
  // _info: GraphQLResolveInfo
): Promise<string> {
  // eslint-disable-next-line no-useless-catch
  try {
    const str = `${new Date().toLocaleTimeString()}`;
    await publishOnChange(str);
    return `Hello ${str}`;
  } catch (e) {
    throw e;
  }
}
