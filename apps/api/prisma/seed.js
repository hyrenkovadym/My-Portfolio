const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const CATEGORY_SEED = [
  { name: 'Backend APIs', slug: 'backend-apis' },
  { name: 'Frontend Experiences', slug: 'frontend-experiences' },
  { name: 'AI Integrations', slug: 'ai-integrations' },
  { name: 'Automation', slug: 'automation' },
];

const PRODUCT_SEED = [
  {
    title: 'Portfolio Platform API',
    slug: 'portfolio-platform-api',
    description:
      'Production-style NestJS backend with Prisma, JWT authentication, cart and order modules.',
    priceCents: 180000,
    currency: 'USD',
    stock: 1,
    isActive: true,
    categorySlug: 'backend-apis',
  },
  {
    title: 'Portfolio Frontend Experience',
    slug: 'portfolio-frontend-experience',
    description:
      'Next.js App Router frontend with responsive UI, project sections, and detail pages.',
    priceCents: 120000,
    currency: 'USD',
    stock: 1,
    isActive: true,
    categorySlug: 'frontend-experiences',
  },
  {
    title: 'Agro AI Scout Concept',
    slug: 'agro-ai-scout-concept',
    description:
      'AI-assisted plant diagnostics concept with practical recommendation flows and validation notes.',
    priceCents: 140000,
    currency: 'USD',
    stock: 1,
    isActive: true,
    categorySlug: 'ai-integrations',
  },
  {
    title: 'Telegram Workflow Assistant',
    slug: 'telegram-workflow-assistant',
    description:
      'Telegram-first automation project with approvals, reminders, and content delivery pipelines.',
    priceCents: 160000,
    currency: 'USD',
    stock: 1,
    isActive: true,
    categorySlug: 'automation',
  },
];

const USER_SEED = [
  {
    email: 'demo.user@example.com',
    password: 'ChangeMe_User_123!',
    role: 'USER',
  },
  {
    email: 'demo.admin@example.com',
    password: 'ChangeMe_Admin_123!',
    role: 'ADMIN',
  },
];

async function seedCategories() {
  const categoriesBySlug = {};

  for (const category of CATEGORY_SEED) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name },
    });

    categoriesBySlug[saved.slug] = saved;
  }

  return categoriesBySlug;
}

async function seedProducts(categoriesBySlug) {
  for (const product of PRODUCT_SEED) {
    const category = categoriesBySlug[product.categorySlug];

    await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        priceCents: product.priceCents,
        currency: product.currency,
        stock: product.stock,
        isActive: product.isActive,
        categoryId: category?.id ?? null,
      },
      update: {
        title: product.title,
        description: product.description,
        priceCents: product.priceCents,
        currency: product.currency,
        stock: product.stock,
        isActive: product.isActive,
        categoryId: category?.id ?? null,
      },
    });
  }
}

async function seedUsers() {
  for (const user of USER_SEED) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      create: {
        email: user.email,
        passwordHash,
        role: user.role,
      },
      update: {
        passwordHash,
        role: user.role,
      },
    });
  }
}

async function main() {
  const categoriesBySlug = await seedCategories();
  await seedProducts(categoriesBySlug);
  await seedUsers();

  console.log('Seed completed successfully.');
  console.log(`Categories: ${CATEGORY_SEED.length}`);
  console.log(`Products: ${PRODUCT_SEED.length}`);
  console.log(`Users: ${USER_SEED.length}`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });