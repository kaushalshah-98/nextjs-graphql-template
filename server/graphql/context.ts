import { getSQLDataSource } from '../db/knex';
import { IContext } from '../types';

const contextHandler = (): IContext => {
  const db = getSQLDataSource();
  return {
    ip: '',
    requestedBy: '',
    db,
  };
};

export { contextHandler };
