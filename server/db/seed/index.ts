import { prisma } from '../client';
import contactSeeder from './contact';

async function main() {
  /** seed contacts */
  await contactSeeder(prisma);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
