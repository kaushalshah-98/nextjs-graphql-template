import { ApolloError } from 'apollo-server-micro';
import { DynamicFieldResolvers } from '../../../types';
import { prisma as client } from '../../client';
import { Contact } from './contact';

export const ContactResolvers: DynamicFieldResolvers<
  typeof Contact.dynamicFields[number],
  Contact
> = {
  fullName: async (parent, _args, { prisma }): Promise<string | null> => {
    try {
      if (parent.hasOwnProperty('fullName') && parent.fullName) {
        return parent.fullName;
      }
      if (parent.hasOwnProperty('firstName') && parent.hasOwnProperty('lastName')) {
        return `${parent.firstName} ${parent.lastName}`;
      }
      const db = prisma ?? client;
      const data = await db.contact.findUnique({ where: { id: parent.id } });
      if (!data) return null;
      return `${data.firstName} ${data.lastName}`;
    } catch (error) {
      console.error('ContactResolvers.fullName()', error);
      throw new ApolloError((error as Error)?.message);
    }
  },
};
