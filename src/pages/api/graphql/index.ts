import { ApolloServer } from 'apollo-server-micro';
import type { RequestHandler } from 'micro';
import microCors from 'micro-cors';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { schema, contextHandler, envVars, ENV_MODE } from '@/server';

const cors = microCors();

const apolloServer = new ApolloServer({
  schema,
  context: contextHandler,
  introspection: Boolean(envVars.env === ENV_MODE.DEVELOPMENT),
});

const startServer = apolloServer.start();

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
  return true;
}

export default cors(handler as RequestHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
