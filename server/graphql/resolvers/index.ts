import { MainMemberResolvers } from '../../db';
import * as query from './query';

const resolvers = {
  MainMember: MainMemberResolvers,
  Query: {
    ...query,
  },
};
export default resolvers;
