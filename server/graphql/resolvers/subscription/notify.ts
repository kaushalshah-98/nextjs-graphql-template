import { pubsub } from '../../../db';

const onChange = {
  subscribe: () => pubsub.asyncIterator(['ON_LISTEN']),
  // subscribe: withFilter(
  //   () => pubsub.asyncIterator('ON_LISTEN'),
  //   ({ payload }: any, variables: any) =>
  //     payload.userId === variables.userId || payload.notification[0]?.global
  // ),
  resolve: (root: any) => root.onChange,
};

export { onChange };
