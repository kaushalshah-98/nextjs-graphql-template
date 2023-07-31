import type { Knex } from 'knex';
import { envVars } from '../config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: envVars.db.connection,
    pool: {
      min: 0,
      max: 3,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      extension: 'ts',
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      extension: 'ts',
      directory: './seeds/development',
    },
  },

  production: {
    client: 'mysql2',
    connection: envVars.db.connection,
    pool: {
      min: 0,
      max: 3,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    migrations: {
      extension: 'ts',
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      extension: 'ts',
      directory: './seeds/production',
    },
  },
};

export default config;
