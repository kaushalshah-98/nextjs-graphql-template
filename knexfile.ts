const env = { development: '.env.development', production: '.env.production' };
require('dotenv').config({ path: env[process.env!.NODE_ENV!] });
import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 0,
      max: 3,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    migrations: {
      extension: 'ts',
      directory: './server/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      extension: 'ts',
      directory: './server/db/seeds/development',
    },
  },

  production: {
    client: 'mysql2',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 0,
      max: 3,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    migrations: {
      extension: 'ts',
      directory: './server/db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      extension: 'ts',
      directory: './server/db/seeds/production',
    },
  },
};

export default config;
