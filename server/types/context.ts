import type { DataSource } from '../db/knex';

export interface IContext {
  ip: string;
  requestedBy: string;
  db: DataSource;
}
