import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Zr@2026#', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'adminZr@gmail.com' },
    update: {},
    create: {
      email: 'adminZr@gmail.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'Super Admin',
    },
  });

  console.log({ admin });

  // Migrate Home Page
  const homePage = await prisma.page.upsert({
    where: { slug: '/' },
    update: {},
    create: {
      title: 'Home',
      slug: '/',
      status: 'Published',
      sections: {
        create: [
          { type: 'Navigation', order: 0, data: '{}' },
          { type: 'HeroVideo', order: 1, data: '{}' },
          { type: 'GallerySection', order: 2, data: '{}' },
          { type: 'OfferingsSection', order: 3, data: '{}' },
          { type: 'ScrollVideo1', order: 4, data: '{}' },
          { type: 'ImageSection2025', order: 5, data: '{}' },
          { type: 'ServiceLevelSection', order: 6, data: '{}' },
          { type: 'KindWords', order: 7, data: '{}' },
          { type: 'JournalSection', order: 8, data: '{}' },
          { type: 'ScrollVideo3', order: 9, data: '{}' },
          { type: 'Footer', order: 10, data: '{}' },
        ]
      }
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
