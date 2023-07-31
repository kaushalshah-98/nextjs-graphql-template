import { ContactResolvers } from '../../db';
import * as mutations from './mutation';
import * as query from './query';
import * as subscription from './subscription';

const resolvers = {
  Contact: ContactResolvers,
  Query: {
    ...query,
  },
  Mutation: {
    ...mutations,
  },
  Subscription: {
    ...subscription,
  },
};
export default resolvers;
