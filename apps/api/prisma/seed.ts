import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aiworkspace.io' },
    update: {},
    create: {
      email: 'admin@aiworkspace.io',
      passwordHash: adminPassword,
      name: 'Admin User',
      username: 'admin',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test freelancer
  const freelancerPassword = await bcrypt.hash('freelancer123', 10);
  const freelancer = await prisma.user.upsert({
    where: { email: 'freelancer@test.com' },
    update: {},
    create: {
      email: 'freelancer@test.com',
      passwordHash: freelancerPassword,
      name: 'John Doe',
      username: 'johndoe',
      role: UserRole.FREELANCER,
      emailVerified: true,
      bio: 'Full-stack developer with 5+ years of experience',
      tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      rateHour: 50,
      availability: 40,
      rating: 4.8,
      isPro: true,
    },
  });
  console.log('✅ Freelancer user created:', freelancer.email);

  // Create test client
  const clientPassword = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@test.com' },
    update: {},
    create: {
      email: 'client@test.com',
      passwordHash: clientPassword,
      name: 'Jane Smith',
      username: 'janesmith',
      role: UserRole.CLIENT,
      emailVerified: true,
      bio: 'Tech entrepreneur looking for talented developers',
    },
  });
  console.log('✅ Client user created:', client.email);

  // Create test brief
  const brief = await prisma.brief.create({
    data: {
      clientId: client.id,
      title: 'Build a modern web application',
      goal: 'Create a SaaS platform for project management',
      description:
        'Looking for an experienced full-stack developer to build a modern web application using React and Node.js. The project includes user authentication, real-time updates, and payment integration.',
      tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
      budgetMin: 5000,
      budgetMax: 10000,
      deadlineDays: 60,
      status: 'OPEN',
    },
  });
  console.log('✅ Brief created:', brief.title);

  // Create test case
  const portfolioCase = await prisma.case.create({
    data: {
      freelancerId: freelancer.id,
      title: 'E-commerce Platform Redesign',
      description:
        'Complete redesign and development of a high-traffic e-commerce platform. Implemented modern UI/UX, improved performance by 40%, and integrated advanced analytics.',
      tags: ['React', 'Next.js', 'TailwindCSS', 'Stripe'],
      budget: 15000,
      durationDays: 90,
      visibility: 'PUBLIC',
      status: 'PUBLISHED',
      linksJson: [
        { type: 'github', url: 'https://github.com/example/project' },
        { type: 'live', url: 'https://example.com' },
      ],
    },
  });
  console.log('✅ Portfolio case created:', portfolioCase.title);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
