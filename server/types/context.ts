import type { PrismaClient, Prisma } from '@prisma/client';

export interface IContext {
  ip: string;
  requestedBy: string;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  token: string | null;
}
