import type { PrismaClient } from '.prisma/client';

export default async function main(prisma: PrismaClient) {
  await prisma.contact.createMany({
    data: [
      {
        firstName: 'kaushal',
        lastName: 'shah',
        email: 'kaushal@gmail.com',
        avatar: 'kaushal.png',
      },
      {
        firstName: 'vaibhav',
        lastName: 'shah',
        email: 'vaibhav@gmail.com',
        avatar: 'vaibhav.png',
      },
    ],
  });
}
