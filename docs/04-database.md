# База данных (PostgreSQL + Prisma)

## 📊 Prisma Schema

### schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USERS
// ============================================

enum UserRole {
  FREELANCER
  CLIENT
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

model User {
  id            String      @id @default(uuid())
  role          UserRole
  status        UserStatus  @default(ACTIVE)
  
  // Auth
  email         String      @unique
  emailVerified Boolean     @default(false)
  passwordHash  String?
  
  // OAuth
  githubId      String?     @unique
  linkedinId    String?     @unique
  telegramId    String?     @unique
  
  // Web3
  walletAddress String?     @unique
  
  // Profile
  name          String
  username      String?     @unique
  bio           String?
  avatarUrl     String?
  location      String?
  timezone      String?
  
  // Freelancer-specific
  tags          String[]    // GIN index
  rateHour      Int?
  availability  Int?        // hours/week
  successRate   Float       @default(0)
  reliability   Int         @default(100)
  responseSpeed Float       @default(0.5)
  
  // Stats
  rating        Float       @default(0)
  totalEarned   Int         @default(0)
  projectsCount Int         @default(0)
  strikes       Int         @default(0)
  
  // Subscription
  isPro         Boolean     @default(false)
  proUntil      DateTime?
  
  // Notifications
  emailNotifications Boolean  @default(true)
  pushNotifications  Boolean  @default(true)
  pushToken          String?
  
  // Relations
  briefsCreated Brief[]      @relation("ClientBriefs")
  projectsAsFreelancer Project[] @relation("FreelancerProjects")
  projectsAsClient Project[]     @relation("ClientProjects")
  offers        Offer[]
  cases         Case[]
  reviewsGiven  Review[]     @relation("ClientReviews")
  reviewsReceived Review[]   @relation("FreelancerReviews")
  messagesSent  Message[]    @relation("SenderMessages")
  messagesReceived Message[] @relation("RecipientMessages")
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  @@index([tags], type: Gin)
  @@index([role, status])
  @@index([username])
}

// ============================================
// BRIEFS
// ============================================

enum BriefStatus {
  DRAFT
  OPEN
  CLOSED
}

model Brief {
  id            String      @id @default(uuid())
  clientId      String
  client        User        @relation("ClientBriefs", fields: [clientId], references: [id])
  
  // Content
  title         String
  goal          String?
  description   String
  tags          String[]    // GIN index
  
  // Budget
  budgetMin     Int
  budgetMax     Int
  
  // Timeline
  deadlineDays  Int
  
  // Status
  status        BriefStatus @default(OPEN)
  
  // Relations
  projects      Project[]
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  @@index([tags], type: Gin)
  @@index([status])
  @@index([clientId])
}

// ============================================
// PROJECTS
// ============================================

enum ProjectStatus {
  OPEN
  MATCHED
  IN_PROGRESS
  IN_ESCROW
  SUBMITTED
  COMPLETED
  DISPUTED
  CANCELLED
}

model Project {
  id            String        @id @default(uuid())
  briefId       String
  brief         Brief         @relation(fields: [briefId], references: [id])
  
  freelancerId  String?
  freelancer    User?         @relation("FreelancerProjects", fields: [freelancerId], references: [id])
  
  clientId      String
  client        User          @relation("ClientProjects", fields: [clientId], references: [id])
  
  // Status
  status        ProjectStatus @default(OPEN)
  
  // Relations
  offers        Offer[]
  escrow        Escrow?
  messages      Message[]
  review        Review?
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([status])
  @@index([freelancerId])
  @@index([clientId])
  @@index([briefId])
}

// ============================================
// OFFERS
// ============================================

enum OfferStatus {
  PENDING
  ACCEPTED
  REJECTED
}

model Offer {
  id            String      @id @default(uuid())
  projectId     String
  project       Project     @relation(fields: [projectId], references: [id])
  
  freelancerId  String
  freelancer    User        @relation(fields: [freelancerId], references: [id])
  
  // Content
  text          String
  rate          Int
  durationDays  Int
  
  status        OfferStatus @default(PENDING)
  
  createdAt     DateTime    @default(now())
  
  @@index([projectId])
  @@index([freelancerId])
  @@index([status])
}

// ============================================
// ESCROWS
// ============================================

enum EscrowStatus {
  FUNDED
  SUBMITTED
  RELEASED
  DISPUTED
  RESOLVED
}

model Escrow {
  id            String       @id @default(uuid())
  
  // Blockchain
  chainId       Int
  dealId        String       @unique
  txHash        String
  token         String       // "USDC"
  amount        BigInt
  
  // Parties
  clientId      String
  freelancerId  String
  projectId     String       @unique
  project       Project      @relation(fields: [projectId], references: [id])
  
  // Status
  status        EscrowStatus
  submittedAt   DateTime?
  releasedAt    DateTime?
  
  // Dispute
  disputeReason String?
  resolution    String?
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@index([status])
  @@index([projectId])
}

// ============================================
// CASES (Portfolio)
// ============================================

enum CaseVisibility {
  PUBLIC
  PRIVATE
  NDA
}

enum CaseStatus {
  DRAFT
  PUBLISHED
  MODERATION
  REJECTED
}

model Case {
  id            String          @id @default(uuid())
  freelancerId  String
  freelancer    User            @relation(fields: [freelancerId], references: [id])
  
  projectId     String?         // Optional link to completed project
  
  // Content
  title         String
  description   String
  tags          String[]
  
  // Details
  budget        Int?
  durationDays  Int?
  
  // Media
  linksJson     Json?           // Array of links
  mediaJson     Json?           // Array of media objects
  
  // Visibility
  visibility    CaseVisibility  @default(PUBLIC)
  status        CaseStatus      @default(PUBLISHED)
  
  // Moderation
  moderationNote String?
  
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  @@index([freelancerId])
  @@index([status])
  @@index([visibility])
}

// ============================================
// REVIEWS
// ============================================

model Review {
  id            String      @id @default(uuid())
  projectId     String      @unique
  project       Project     @relation(fields: [projectId], references: [id])
  
  clientId      String
  client        User        @relation("ClientReviews", fields: [clientId], references: [id])
  
  freelancerId  String
  freelancer    User        @relation("FreelancerReviews", fields: [freelancerId], references: [id])
  
  rating        Int         // 1-5
  comment       String?
  
  createdAt     DateTime    @default(now())
  
  @@index([freelancerId])
  @@index([projectId])
}

// ============================================
// MESSAGES
// ============================================

model Message {
  id            String      @id @default(uuid())
  projectId     String
  project       Project     @relation(fields: [projectId], references: [id])
  
  senderId      String
  sender        User        @relation("SenderMessages", fields: [senderId], references: [id])
  
  recipientId   String
  recipient     User        @relation("RecipientMessages", fields: [recipientId], references: [id])
  
  text          String
  read          Boolean     @default(false)
  
  createdAt     DateTime    @default(now())
  
  @@index([projectId])
  @@index([senderId])
  @@index([recipientId])
  @@index([createdAt])
}
```

---

## 🔍 Критичные индексы

```sql
-- Tags (GIN index для массивов)
CREATE INDEX idx_users_tags ON users USING GIN(tags);
CREATE INDEX idx_briefs_tags ON briefs USING GIN(tags);

-- Status indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_escrows_status ON escrows(status);
CREATE INDEX idx_offers_status ON offers(status);

-- Foreign keys
CREATE INDEX idx_projects_freelancer ON projects(freelancer_id);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_cases_freelancer ON cases(freelancer_id);
CREATE INDEX idx_messages_project ON messages(project_id);

-- Composite indexes
CREATE INDEX idx_users_role_status ON users(role, status);
CREATE INDEX idx_messages_project_created ON messages(project_id, created_at);
```

---

## 🚀 Миграции

### Создание миграции

```bash
# Development
npx prisma migrate dev --name add_users_table

# Production
npx prisma migrate deploy
```

### Rollback strategy

```typescript
// scripts/rollback-migration.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function rollback() {
  // Get last migration
  const migrations = await prisma.$queryRaw`
    SELECT migration_name 
    FROM _prisma_migrations 
    ORDER BY finished_at DESC 
    LIMIT 1
  `;
  
  console.log('Last migration:', migrations);
  
  // Manual rollback logic here
  // ...
}

rollback();
```

---

## 📦 Seeding

### seed.ts

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@aiworkspace.io',
      passwordHash: await bcrypt.hash('admin123', 10),
      emailVerified: true,
      name: 'Admin',
      username: 'admin',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });
  
  console.log('Created admin:', admin.id);
  
  // Create freelancers
  const freelancers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        username: 'johndoe',
        role: 'FREELANCER',
        status: 'ACTIVE',
        tags: ['React', 'TypeScript', 'Node.js'],
        rateHour: 50,
        availability: 40,
        bio: 'Full-stack developer with 5+ years experience'
      }
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        username: 'janesmith',
        role: 'FREELANCER',
        status: 'ACTIVE',
        tags: ['Python', 'AI', 'Machine Learning'],
        rateHour: 80,
        availability: 30,
        bio: 'AI/ML specialist'
      }
    })
  ]);
  
  console.log(`Created ${freelancers.length} freelancers`);
  
  // Create client
  const client = await prisma.user.create({
    data: {
      email: 'client@example.com',
      name: 'Startup Inc',
      username: 'startup',
      role: 'CLIENT',
      status: 'ACTIVE'
    }
  });
  
  console.log('Created client:', client.id);
  
  // Create brief
  const brief = await prisma.brief.create({
    data: {
      clientId: client.id,
      title: 'Build landing page',
      description: 'Need a modern landing page with React and Tailwind',
      tags: ['React', 'Tailwind', 'TypeScript'],
      budgetMin: 1000,
      budgetMax: 3000,
      deadlineDays: 14,
      status: 'OPEN'
    }
  });
  
  console.log('Created brief:', brief.id);
  
  // Create project
  const project = await prisma.project.create({
    data: {
      briefId: brief.id,
      clientId: client.id,
      status: 'OPEN'
    }
  });
  
  console.log('Created project:', project.id);
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 🔄 Queries Examples

### Complex queries

```typescript
// Find matching freelancers
const matches = await prisma.user.findMany({
  where: {
    role: 'FREELANCER',
    status: 'ACTIVE',
    availability: { gt: 0 },
    tags: {
      hasSome: ['React', 'TypeScript']
    }
  },
  include: {
    cases: {
      where: { status: 'PUBLISHED' },
      take: 3
    },
    reviewsReceived: {
      select: {
        rating: true
      }
    }
  },
  orderBy: {
    rating: 'desc'
  },
  take: 10
});

// Get user with stats
const userWithStats = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    _count: {
      select: {
        cases: true,
        projectsAsFreelancer: {
          where: { status: 'COMPLETED' }
        },
        reviewsReceived: true
      }
    },
    reviewsReceived: {
      select: {
        rating: true
      }
    }
  }
});

// Calculate average rating
const avgRating = userWithStats.reviewsReceived.reduce(
  (acc, r) => acc + r.rating, 0
) / userWithStats.reviewsReceived.length;

// Get active projects with escrow status
const activeProjects = await prisma.project.findMany({
  where: {
    status: {
      in: ['IN_PROGRESS', 'IN_ESCROW', 'SUBMITTED']
    }
  },
  include: {
    brief: {
      select: {
        title: true,
        budgetMin: true,
        budgetMax: true
      }
    },
    freelancer: {
      select: {
        id: true,
        name: true,
        avatarUrl: true
      }
    },
    client: {
      select: {
        id: true,
        name: true
      }
    },
    escrow: {
      select: {
        status: true,
        amount: true,
        submittedAt: true
      }
    }
  }
});

// Search users by tags (full-text)
const searchResults = await prisma.$queryRaw`
  SELECT * FROM users
  WHERE role = 'FREELANCER'
  AND tags && ARRAY['React', 'Node.js']::text[]
  ORDER BY rating DESC
  LIMIT 20
`;
```

---

## 🔧 Connection Pool

### Configuration

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection pool settings in DATABASE_URL
// postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=30
```

---

## 💾 Backup Strategy

### scripts/backup.sh

```bash
#!/bin/bash

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_NAME="aiworkspace"

mkdir -p $BACKUP_DIR

# Full backup
pg_dump -h localhost -U postgres -d $DB_NAME -F c -f "$BACKUP_DIR/${DB_NAME}_${DATE}.backup"

# Compress
gzip "$BACKUP_DIR/${DB_NAME}_${DATE}.backup"

# Upload to S3
aws s3 cp "$BACKUP_DIR/${DB_NAME}_${DATE}.backup.gz" s3://backups/database/

# Keep only last 7 days locally
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: ${DB_NAME}_${DATE}.backup.gz"
```

### Restore

```bash
#!/bin/bash

BACKUP_FILE=$1

# Download from S3
aws s3 cp "s3://backups/database/$BACKUP_FILE" ./

# Decompress
gunzip $BACKUP_FILE

# Restore
pg_restore -h localhost -U postgres -d aiworkspace -c ${BACKUP_FILE%.gz}

echo "Restore completed"
```

---

## 📊 Performance Optimization

### Query optimization

```typescript
// Bad: N+1 query problem
const users = await prisma.user.findMany();
for (const user of users) {
  const cases = await prisma.case.findMany({
    where: { freelancerId: user.id }
  });
}

// Good: Use include
const users = await prisma.user.findMany({
  include: {
    cases: true
  }
});

// Better: Select only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    cases: {
      select: {
        id: true,
        title: true
      },
      take: 5
    }
  }
});
```

### Pagination

```typescript
// Cursor-based pagination (recommended)
async function getProjects(cursor?: string, take = 20) {
  return prisma.project.findMany({
    take: take + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: 'desc'
    }
  });
}

// Offset pagination (for small datasets)
async function getProjectsOffset(page = 1, pageSize = 20) {
  const skip = (page - 1) * pageSize;
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.project.count()
  ]);
  
  return {
    data: projects,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  };
}
```

---

## 🔍 Full-text Search

### Using PostgreSQL extensions

```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN index for search
CREATE INDEX idx_users_search ON users USING GIN(
  to_tsvector('english', name || ' ' || COALESCE(bio, ''))
);

CREATE INDEX idx_briefs_search ON briefs USING GIN(
  to_tsvector('english', title || ' ' || description)
);
```

```typescript
// Full-text search query
const searchUsers = await prisma.$queryRaw`
  SELECT * FROM users
  WHERE to_tsvector('english', name || ' ' || COALESCE(bio, ''))
  @@ plainto_tsquery('english', ${query})
  ORDER BY ts_rank(
    to_tsvector('english', name || ' ' || COALESCE(bio, '')),
    plainto_tsquery('english', ${query})
  ) DESC
  LIMIT 20
`;
```

---

[← Назад: Smart Contracts](03-smart-contracts.md) | [Далее: Security →](05-security.md)
