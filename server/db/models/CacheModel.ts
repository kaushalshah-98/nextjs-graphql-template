/* eslint-disable max-classes-per-file */
import { Model, Page, QueryBuilder } from 'objection';

class CacheQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  // These are necessary. You can just copy-paste them and change the
  // name of the query builder class.
  declare ArrayQueryBuilderType: CacheQueryBuilder<M, M[]>;

  declare SingleQueryBuilderType: CacheQueryBuilder<M, M>;

  declare MaybeSingleQueryBuilderType: CacheQueryBuilder<M, M | undefined>;

  declare NumberQueryBuilderType: CacheQueryBuilder<M, number>;

  declare PageQueryBuilderType: CacheQueryBuilder<M, Page<M>>;
}

class CacheModel extends Model {
  // Both of these are needed.
  declare QueryBuilderType: CacheQueryBuilder<this>;

  static get QueryBuilder() {
    return CacheQueryBuilder;
  }

  static get dynamicFields(): readonly string[] {
    return [];
  }
}

export { CacheModel, CacheQueryBuilder };
