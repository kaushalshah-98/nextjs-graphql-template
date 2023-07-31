import { prisma } from '../db';
import { IContext } from '../types';

const contextHandler = ({
  _req,
  connection,
  _socket,
}: {
  _req: Request;
  connection: any;
  _socket: any;
}): IContext => {
  if (connection) {
    // check connection for metadata
    return connection.context;
  }
  return {
    prisma,
    ip: '',
    requestedBy: '',
    token: '',
  };
};

export { contextHandler };
