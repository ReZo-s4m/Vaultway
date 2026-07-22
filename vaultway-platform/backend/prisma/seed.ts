/**
 * Seeds the two baseline roles (ADMIN, USER) and, optionally, an initial admin
 * user when ADMIN_EMAIL / ADMIN_USERNAME / ADMIN_PASSWORD are set in the env.
 *
 * Run with:  npm run db:seed
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'ADMIN', description: 'Full administrative access' },
    { name: 'USER', description: 'Standard end-user access' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }
  console.log('Seeded roles: ADMIN, USER');

  const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_USERNAME && ADMIN_PASSWORD) {
    const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: 'ADMIN' } });
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {},
      create: {
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        passwordHash,
        name: 'Administrator',
        roleId: adminRole.id,
      },
    });
    console.log(`Seeded admin user: ${ADMIN_EMAIL}`);
  } else {
    console.log('No ADMIN_* env vars set — skipping admin user creation.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
