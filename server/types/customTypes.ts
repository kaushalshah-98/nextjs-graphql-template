import { IContext } from './context';

declare const __nominal__type: unique symbol;
export type Nominal<T, U> = T & { readonly [__nominal__type]: U };

export type DynamicFieldResolvers<S extends string, T = unknown, U = unknown, V = unknown> = Record<
  S,
  (parent: T, _args: U, ctx: IContext, info?: any) => Promise<V> | V
>;
