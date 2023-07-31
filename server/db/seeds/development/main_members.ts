import { Knex } from 'knex';
import { TABLE_NAMES } from '../../tableConfig';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAMES.MAIN_MEMBERS).del();

  // Inserts seed entries
  await knex(TABLE_NAMES.MAIN_MEMBERS).insert([
    { name: 'rowValue1' },
    { name: 'rowValue2' },
    { name: 'rowValue3' },
  ]);
}
