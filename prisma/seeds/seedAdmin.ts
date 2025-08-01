import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashed
    }
  });
  console.log('User admin seeded!');
}
main().then(() => process.exit(0));
