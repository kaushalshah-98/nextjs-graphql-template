import { Knex } from 'knex';
import { addTimeStamps } from '../helpers';
import { TABLE_NAMES } from '../tableConfig';

export async function up(knex: Knex): Promise<void> {
  // create table
  await knex.schema.createTable(TABLE_NAMES.MAIN_MEMBERS, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name', 26).notNullable();
    // table.json('items');
    // table.boolean('status').defaultTo(0);
    // table.timestamps(true, true);
    // table.index(['id'], `${TABLE_NAMES.MAIN_MEMBERS}_userId`);
  });

  // add timestamps
  await addTimeStamps(knex, TABLE_NAMES.MAIN_MEMBERS, { createdAt: true, updatedAt: true });
}

export async function down(knex: Knex): Promise<void> {
  // drop table
  await knex.schema.dropTable(TABLE_NAMES.MAIN_MEMBERS);
}
