/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import Knex from 'knex';
import type { Knex as knexType } from 'knex';
import { Model } from 'objection';
import { envVars, ENV_MODE } from '../config';
import knexConfig from './knex.config';
import { MainMember } from './models/MainMember/MainMember';

declare global {
  var knex: knexType<any, unknown[]> | undefined;
}

let sqlDataSource: DataSource;

const dbConfig = {
  [ENV_MODE.DEVELOPMENT]: knexConfig.development,
  [ENV_MODE.PRODUCTION]: knexConfig.production,
};

class DataSource {
  configByEnvironment: knexType.Config;

  knex!: knexType<any, unknown[]> | undefined;

  MainMember: typeof MainMember;

  constructor() {
    this.configByEnvironment = dbConfig[envVars.env || 'development'];
    this.MainMember = MainMember;

    if (!global.knex) {
      this.initialize();
    }
  }

  private initialize() {
    const connection = Knex(this.configByEnvironment);
    this.knex = connection;
    global.knex = connection;
    Model.knex(this.knex);
    return connection;
  }

  public getDb() {
    if (this.knex) return this.knex;
    if (global.knex) return global.knex;

    return this.initialize();
  }
}

function getSQLDataSource() {
  if (sqlDataSource) return sqlDataSource;

  sqlDataSource = new DataSource();
  return sqlDataSource;
}

export { getSQLDataSource, DataSource };
