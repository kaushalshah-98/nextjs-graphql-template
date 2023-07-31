import type { Knex } from 'knex';

interface IAddTimeStamps {
  createdAt: boolean;
  updatedAt: boolean;
}
export const addTimeStamps = async (
  knex: Knex,
  tableName: string,
  timestamps: IAddTimeStamps
): Promise<Knex.SchemaBuilder> =>
  knex.schema.alterTable(tableName, (t) => {
    if (timestamps.createdAt) {
      t.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    }
    if (timestamps.updatedAt) {
      t.timestamp('updated_at', { useTz: false })
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    }
  });
