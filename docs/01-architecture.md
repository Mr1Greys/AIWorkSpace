# Архитектура и технологии

## ⚙️ Технический стек (web2.5)

| Компонент | Технологии |
|-----------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, Wagmi, WalletConnect |
| **Backend API** | Node.js, NestJS, TypeScript, PostgreSQL, Prisma ORM, Redis |
| **Real-time** | Socket.io (WebSocket gateway) |
| **Notifications** | Bull Queue, Nodemailer, Firebase Cloud Messaging |
| **AI-сервисы** | LangChain, OpenAI API (GPT-4 + embeddings), vector search |
| **Storage** | AWS S3 / Cloudflare R2, IPFS (Pinata) |
| **Blockchain** | Base L2, Polygon (fallback), USDC escrow, Ethers.js, Hardhat, OpenZeppelin |
| **Auth** | OAuth (GitHub, LinkedIn, Telegram), SIWE (Sign-In with Ethereum) |
| **Security** | Helmet.js, express-rate-limit, class-validator, ClamAV (virus scan) |
| **Monitoring** | Sentry, Winston/Pino, Prometheus, Grafana |
| **Testing** | Jest, Playwright, Hardhat/Waffle |
| **Infra** | Docker, Docker Compose, Nginx, GitHub Actions CI/CD |

---

## 🗂️ Структура проекта

```bash
aiworkspace/
├── apps/
│   ├── web/                          # Next.js frontend
│   │   ├── components/
│   │   │   ├── brief/                # Брив-конструктор
│   │   │   │   ├── BriefWizard.tsx
│   │   │   │   ├── StepGoal.tsx
│   │   │   │   ├── StepStack.tsx
│   │   │   │   ├── StepBudget.tsx
│   │   │   │   └── StepTimeline.tsx
│   │   │   ├── match/                # AI-матчинг
│   │   │   │   ├── MatchList.tsx
│   │   │   │   ├── FreelancerCard.tsx
│   │   │   │   └── MatchScore.tsx
│   │   │   ├── cases/                # Портфолио
│   │   │   │   ├── CaseGrid.tsx
│   │   │   │   ├── CaseCard.tsx
│   │   │   │   └── CaseUpload.tsx
│   │   │   ├── wallet/               # Web3 wallet
│   │   │   │   ├── WalletModal.tsx
│   │   │   │   └── PaymentFlow.tsx
│   │   │   ├── chat/                 # Real-time чат
│   │   │   │   ├── ChatBox.tsx
│   │   │   │   ├── MessageList.tsx
│   │   │   │   └── TypingIndicator.tsx
│   │   │   ├── deal/                 # Этапы сделки
│   │   │   │   ├── DealTimeline.tsx
│   │   │   │   └── EscrowStatus.tsx
│   │   │   └── ui/                   # Базовые UI
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Card.tsx
│   │   │       └── Badge.tsx
│   │   ├── pages/
│   │   │   ├── index.tsx             # Главная
│   │   │   ├── brief/                # Конструктор
│   │   │   │   └── index.tsx
│   │   │   ├── projects/             # Лента задач
│   │   │   │   ├── index.tsx
│   │   │   │   └── [id].tsx
│   │   │   ├── freelancers/          # Каталог
│   │   │   │   └── index.tsx
│   │   │   ├── teams/                # Команды
│   │   │   │   └── index.tsx
│   │   │   ├── profile/              # Профиль
│   │   │   │   └── [id].tsx
│   │   │   ├── cases/                # Кейсы
│   │   │   │   └── [id].tsx
│   │   │   ├── chat/                 # Чат
│   │   │   │   └── [id].tsx
│   │   │   ├── auth/                 # Авторизация
│   │   │   │   ├── signin.tsx
│   │   │   │   └── callback.tsx
│   │   │   └── admin/                # Админка
│   │   │       ├── index.tsx
│   │   │       ├── disputes.tsx
│   │   │       └── moderation.tsx
│   │   ├── store/                    # Zustand store
│   │   │   ├── authStore.ts
│   │   │   ├── walletStore.ts
│   │   │   └── chatStore.ts
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useWallet.ts
│   │   │   ├── useMatch.ts
│   │   │   └── useChat.ts
│   │   ├── styles/                   # Styles
│   │   │   ├── globals.css
│   │   │   └── themes.css
│   │   ├── utils/                    # Utils
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── api.ts
│   │   ├── lib/                      # Libs
│   │   │   ├── wagmi.ts
│   │   │   └── socket.ts
│   │   ├── public/                   # Static assets
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── api/                          # NestJS backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/             # Авторизация
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   └── strategies/   # OAuth, SIWE
│   │   │   │   ├── users/            # Пользователи
│   │   │   │   │   ├── users.controller.ts
│   │   │   │   │   ├── users.service.ts
│   │   │   │   │   └── users.module.ts
│   │   │   │   ├── briefs/           # Брифы
│   │   │   │   │   ├── briefs.controller.ts
│   │   │   │   │   ├── briefs.service.ts
│   │   │   │   │   └── briefs.module.ts
│   │   │   │   ├── projects/         # Проекты
│   │   │   │   ├── offers/           # Отклики
│   │   │   │   ├── escrows/          # Эскроу
│   │   │   │   ├── cases/            # Кейсы
│   │   │   │   ├── match/            # AI-матчинг
│   │   │   │   ├── reviews/          # Отзывы
│   │   │   │   ├── chat/             # Real-time чат
│   │   │   │   │   ├── chat.gateway.ts
│   │   │   │   │   └── chat.service.ts
│   │   │   │   ├── notifications/    # Уведомления
│   │   │   │   │   ├── notifications.service.ts
│   │   │   │   │   ├── notifications.processor.ts
│   │   │   │   │   └── templates/    # Email templates
│   │   │   │   ├── monitoring/       # Мониторинг
│   │   │   │   │   ├── health.controller.ts
│   │   │   │   │   └── metrics.service.ts
│   │   │   │   └── admin/            # Админ
│   │   │   │       ├── admin.controller.ts
│   │   │   │       └── admin.service.ts
│   │   │   ├── prisma/               # Prisma ORM
│   │   │   │   ├── schema.prisma
│   │   │   │   └── migrations/
│   │   │   ├── common/               # Shared code
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   ├── filters/
│   │   │   │   └── decorators/
│   │   │   ├── config/               # Configuration
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── db.config.ts
│   │   │   │   └── redis.config.ts
│   │   │   └── main.ts
│   │   ├── test/                     # E2E tests
│   │   │   ├── auth.e2e-spec.ts
│   │   │   └── escrow.e2e-spec.ts
│   │   ├── Dockerfile
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── contracts/                    # Hardhat project
│       ├── contracts/
│       │   ├── SimpleEscrow.sol      # Main escrow
│       │   ├── WorkProof.sol         # Work hash storage
│       │   └── interfaces/
│       │       └── IEscrow.sol
│       ├── scripts/
│       │   ├── deploy.ts
│       │   └── verify.ts
│       ├── test/
│       │   ├── SimpleEscrow.test.ts
│       │   └── WorkProof.test.ts
│       ├── hardhat.config.ts
│       ├── .env.contracts
│       └── package.json
│
├── packages/
│   ├── shared/                       # Shared types
│   │   ├── types/
│   │   │   ├── user.types.ts
│   │   │   ├── project.types.ts
│   │   │   └── escrow.types.ts
│   │   ├── dtos/
│   │   │   ├── create-brief.dto.ts
│   │   │   └── create-offer.dto.ts
│   │   ├── constants/
│   │   │   ├── status.ts
│   │   │   └── roles.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── ui/                           # Shared UI
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Card/
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── utils/                        # Shared utils
│       ├── format.ts
│       ├── validation.ts
│       ├── tsconfig.json
│       └── package.json
│
├── scripts/
│   ├── seed.ts                       # Database seeding
│   ├── backup.sh                     # Backup script
│   ├── migrate-prod.sh               # Production migration
│   └── setup-dev.sh                  # Dev environment setup
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Continuous Integration
│       ├── deploy-staging.yml        # Staging deployment
│       └── deploy-prod.yml           # Production deployment
│
├── docker-compose.yml                # Local development
├── docker-compose.staging.yml        # Staging environment
├── docker-compose.prod.yml           # Production environment
├── .env.example                      # Environment template
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── specs/AIWORKSPACE_SPEC.md
```

---

## 🎨 Frontend Architecture (Next.js)

### Роуты и страницы

| Route | Компонент | Описание |
|-------|-----------|----------|
| `/` | `pages/index.tsx` | Главная: поиск по тегам + CTA |
| `/brief` | `pages/brief/index.tsx` | Wizard создания задачи |
| `/projects` | `pages/projects/index.tsx` | Лента задач (баунти, кастом) |
| `/projects/:id` | `pages/projects/[id].tsx` | Детали проекта |
| `/freelancers` | `pages/freelancers/index.tsx` | Каталог фрилансеров |
| `/teams` | `pages/teams/index.tsx` | Команды исполнителей |
| `/profile/:id` | `pages/profile/[id].tsx` | Профиль пользователя |
| `/cases/:id` | `pages/cases/[id].tsx` | Просмотр кейса |
| `/chat/:id` | `pages/chat/[id].tsx` | Чат + статус сделки |
| `/auth/signin` | `pages/auth/signin.tsx` | Авторизация |
| `/admin` | `pages/admin/index.tsx` | Админ-панель |

### Ключевые компоненты

#### BriefWizard
```typescript
// Пошаговый конструктор задачи
interface BriefWizardProps {
  onComplete: (brief: Brief) => void;
}

const steps = [
  { id: 'goal', title: 'Цель проекта' },
  { id: 'stack', title: 'Технологии' },
  { id: 'budget', title: 'Бюджет' },
  { id: 'timeline', title: 'Сроки' },
  { id: 'match', title: 'Подбор специалистов' }
];
```

#### MatchList
```typescript
// Список релевантных специалистов с AI-scoring
interface Match {
  freelancer: User;
  score: number;
  breakdown: {
    tagMatch: number;
    pastSuccess: number;
    availability: number;
    budgetFit: number;
  };
}
```

#### ChatBox
```typescript
// Real-time чат через Socket.io
const socket = io(API_URL);

useEffect(() => {
  socket.emit('join', projectId);
  socket.on('new-message', handleNewMessage);
  socket.on('user-typing', handleTyping);
  
  return () => socket.disconnect();
}, [projectId]);
```

### State Management (Zustand)

```typescript
// authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

// walletStore.ts
interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}
```

### Performance оптимизации

```typescript
// 1. Debounced search
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback(
  (query: string) => searchFreelancers(query),
  300
);

// 2. Virtual scrolling
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80
});

// 3. Code splitting
const AdminPanel = dynamic(() => import('@/components/admin/Panel'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

// 4. Image optimization
import Image from 'next/image';

<Image
  src={avatarUrl}
  width={64}
  height={64}
  loading="lazy"
  placeholder="blur"
/>

// 5. API caching (SWR)
import useSWR from 'swr';

const { data, error } = useSWR(`/api/users/${id}`, fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 10000
});
```

---

## 🔧 Backend Architecture (NestJS)

### Модульная структура

Каждый модуль следует паттерну:
```
module/
├── dto/                    # Data Transfer Objects
│   ├── create-*.dto.ts
│   └── update-*.dto.ts
├── entities/              # TypeORM/Prisma entities
│   └── *.entity.ts
├── *.controller.ts        # HTTP endpoints
├── *.service.ts           # Business logic
├── *.module.ts            # Module definition
└── *.spec.ts             # Unit tests
```

### Middleware Stack

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
  });
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 100
  }));
  
  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  
  // Logging
  app.use(morgan('combined'));
  
  // API docs
  const config = new DocumentBuilder()
    .setTitle('AIWorkSpace API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(3001);
}
```

### Guards & Interceptors

```typescript
// auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    return roles.includes(request.user.role);
  }
}

// logging.interceptor.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`))
    );
  }
}
```

---

## ⛓️ Blockchain Layer

### Network Configuration

```typescript
// Base L2 (Production)
const BASE_CONFIG = {
  chainId: 8453,
  name: 'Base',
  rpcUrl: process.env.BASE_RPC_URL,
  escrowAddress: '0x...',
  usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
};

// Polygon (Fallback)
const POLYGON_CONFIG = {
  chainId: 137,
  name: 'Polygon',
  rpcUrl: process.env.POLYGON_RPC_URL,
  escrowAddress: '0x...',
  usdcAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
};
```

### Wagmi Setup

```typescript
// lib/wagmi.ts
import { createConfig, configureChains } from 'wagmi';
import { base, polygon } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient } = configureChains(
  [base, polygon],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY })]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: { projectId: process.env.WC_PROJECT_ID }
    })
  ],
  publicClient
});
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest)
```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, PrismaService]
    }).compile();
    
    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  
  it('should create a user', async () => {
    const dto = { name: 'John', email: 'john@test.com' };
    const result = await service.create(dto);
    expect(result.name).toBe('John');
  });
});
```

### E2E Tests (Playwright)
```typescript
// e2e/brief-flow.spec.ts
test('complete brief creation flow', async ({ page }) => {
  await page.goto('/brief');
  
  // Step 1: Goal
  await page.fill('textarea[name="goal"]', 'Build landing page');
  await page.click('button:has-text("Далее")');
  
  // Step 2: Stack
  await page.click('button:has-text("React")');
  await page.click('button:has-text("Далее")');
  
  // Step 3: Budget
  await page.fill('input[name="budgetMin"]', '1000');
  await page.fill('input[name="budgetMax"]', '3000');
  await page.click('button:has-text("Далее")');
  
  // Step 4: Timeline
  await page.fill('input[name="deadlineDays"]', '14');
  await page.click('button:has-text("Найти специалистов")');
  
  // Step 5: Match
  await expect(page.locator('.match-card')).toHaveCount(10);
});
```

### Contract Tests (Hardhat)
```typescript
// test/SimpleEscrow.test.ts
describe('SimpleEscrow', () => {
  it('should create and fund escrow', async () => {
    const amount = ethers.parseUnits('1000', 6); // 1000 USDC
    
    await usdc.approve(escrow.address, amount);
    const tx = await escrow.createAndFund(freelancer.address, amount, 14);
    await tx.wait();
    
    const deal = await escrow.deals(1);
    expect(deal.amount).to.equal(amount);
    expect(deal.status).to.equal(1); // Funded
  });
});
```

---

## 📦 Package Management

### Monorepo Setup (Turborepo recommended)

```json
// package.json (root)
{
  "name": "aiworkspace",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "^5.2.0"
  }
}
```

---

## 🔄 Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/brief-wizard

# 2. Develop locally
npm run dev

# 3. Write tests
npm run test

# 4. Lint & format
npm run lint
npm run format

# 5. Commit with conventional commits
git commit -m "feat(brief): add wizard component"

# 6. Push and create PR
git push origin feature/brief-wizard

# 7. CI runs automatically
# 8. Review and merge
# 9. Auto-deploy to staging
```

---

[← Назад к оглавлению](../specs/AIWORKSPACE_SPEC.md) | [Далее: Backend API →](02-backend-api.md)
