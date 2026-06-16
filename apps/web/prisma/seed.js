const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'cgtechnoelectronics@gmail.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('Error: ADMIN_PASSWORD environment variable is not set.');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`Successfully seeded admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
