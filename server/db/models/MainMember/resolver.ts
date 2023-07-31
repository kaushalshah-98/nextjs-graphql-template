import { ApolloError } from 'apollo-server-micro';
import { DynamicFieldResolvers } from '../../../types';
import { getSQLDataSource } from '../../knex';
import { MainMember } from './MainMember';

export const MainMemberResolvers: DynamicFieldResolvers<
  typeof MainMember.dynamicFields[number],
  MainMember
> = {
  fullName: async (parent, _args, { db }): Promise<string> => {
    try {
      if (parent.hasOwnProperty('fullName')) {
        return parent.fullName;
      }
      if (parent.hasOwnProperty('name')) {
        return `${parent.name} FullName`;
      }
      const knex = db ?? getSQLDataSource();
      const data = await knex.MainMember.query().findById(parent.id).select('name');
      return `${data?.name} FullName`;
    } catch (error) {
      console.error('MainMemberResolvers.fullName()', error);
      throw new ApolloError((error as Error)?.message);
    }
  },
};
