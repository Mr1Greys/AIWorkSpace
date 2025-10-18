# Contributing to AIWorkSpace

Спасибо за интерес к нашему проекту! Мы приветствуем любой вклад — баг-репорты, улучшения кода, документация или новые фичи.

---

## 📋 Code of Conduct

Участвуя в проекте, вы соглашаетесь соблюдать наш Code of Conduct:

- Будьте уважительны к другим участникам
- Конструктивная критика приветствуется
- Никакого harassment или токсичности
- Помогайте новичкам

---

## 🐛 Reporting Bugs

Нашли баг? Создайте issue с:

1. **Заголовок**: краткое описание проблемы
2. **Описание**: подробное описание
3. **Шаги для воспроизведения**:
   ```
   1. Зайти на '...'
   2. Кликнуть на '...'
   3. Увидеть ошибку
   ```
4. **Ожидаемое поведение**: что должно было произойти
5. **Фактическое поведение**: что произошло на самом деле
6. **Скриншоты**: если применимо
7. **Окружение**:
   - OS: [e.g. macOS 14]
   - Browser: [e.g. Chrome 120]
   - Node version: [e.g. 18.17.0]

---

## 💡 Suggesting Features

Есть идея? Создайте issue с тегом `enhancement`:

1. **Описание**: что вы хотите добавить
2. **Мотивация**: зачем это нужно
3. **Альтернативы**: какие есть варианты
4. **Mockups**: если есть визуальные идеи

---

## 🔧 Development Setup

### Prerequisites

```bash
Node.js 18+
PostgreSQL 15+
Redis 7+
Docker & Docker Compose
```

### Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/aiworkspace.git
cd aiworkspace

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local

# 4. Start infrastructure
docker-compose up -d

# 5. Run migrations
cd apps/api
npx prisma migrate dev

# 6. Start development servers
npm run dev
```

---

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User> {
  return prisma.user.findUnique({ where: { id } });
}

// ❌ Bad
function getUser(id) {
  return prisma.user.findUnique({ where: { id } });
}
```

### React Components

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ Bad
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### NestJS Services

```typescript
// ✅ Good
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

// ❌ Bad
export class UsersService {
  async findOne(id) {
    return prisma.user.findUnique({ where: { id } });
  }
}
```

---

## 🧪 Testing

### Unit Tests

```typescript
describe('UsersService', () => {
  let service: UsersService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, PrismaService]
    }).compile();
    
    service = module.get<UsersService>(UsersService);
  });
  
  it('should find a user by id', async () => {
    const user = await service.findOne('user-id');
    expect(user).toBeDefined();
    expect(user.id).toBe('user-id');
  });
});
```

### E2E Tests

```typescript
test('user can create a brief', async ({ page }) => {
  await page.goto('/brief');
  await page.fill('input[name="title"]', 'Test Brief');
  await page.click('button:has-text("Создать")');
  await expect(page).toHaveURL(/\/briefs\/.+/);
});
```

### Coverage Requirements

- Unit tests: 80% minimum
- E2E tests: критичные flows
- Contract tests: 100% coverage

---

## 🔀 Pull Request Process

### 1. Create Branch

```bash
git checkout -b feature/amazing-feature
# или
git checkout -b fix/bug-description
```

### 2. Make Changes

- Следуйте coding standards
- Добавьте tests
- Обновите документацию если нужно

### 3. Commit

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(briefs): add AI-powered tagging"
git commit -m "fix(auth): resolve JWT token expiration"
git commit -m "docs(readme): update installation steps"
```

**Типы коммитов:**
- `feat`: новая фича
- `fix`: исправление бага
- `docs`: изменения в документации
- `style`: форматирование кода
- `refactor`: рефакторинг
- `test`: добавление тестов
- `chore`: обновление зависимостей, конфигов

### 4. Push

```bash
git push origin feature/amazing-feature
```

### 5. Create Pull Request

- **Title**: краткое описание изменений
- **Description**: подробное описание
- **Related Issues**: закрывает issue #123
- **Screenshots**: если есть UI изменения
- **Checklist**:
  - [ ] Tests added/updated
  - [ ] Documentation updated
  - [ ] Lint passed
  - [ ] No breaking changes

### 6. Review Process

- Ожидайте review от maintainers
- Отвечайте на комментарии
- Вносите правки если требуется
- После approve — merge!

---

## 📚 Documentation

При добавлении новых фич:

1. **Обновите README.md** если меняется setup
2. **Добавьте JSDoc комментарии**:
   ```typescript
   /**
    * Creates a new brief
    * @param dto - Brief creation data
    * @param userId - ID of the user creating the brief
    * @returns Created brief object
    */
   async create(dto: CreateBriefDto, userId: string): Promise<Brief>
   ```
3. **Обновите Swagger** для API endpoints
4. **Добавьте примеры** использования

---

## 🏗️ Architecture Guidelines

### Backend (NestJS)

```
src/
├── modules/
│   └── users/
│       ├── dto/           # Data Transfer Objects
│       ├── entities/      # Prisma entities
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.module.ts
│       └── users.spec.ts
```

### Frontend (Next.js)

```
components/
└── users/
    ├── UserCard.tsx
    ├── UserList.tsx
    └── __tests__/
        └── UserCard.test.tsx
```

### Smart Contracts

```
contracts/
├── SimpleEscrow.sol
└── test/
    └── SimpleEscrow.test.ts
```

---

## 🚀 Deployment

Maintainers only:

```bash
# Staging
git push origin develop

# Production
git tag v1.0.0
git push origin v1.0.0
```

---

## 💬 Getting Help

- **Discord**: [Join our server](#)
- **GitHub Discussions**: Для вопросов
- **GitHub Issues**: Для багов и фич

---

## 🙏 Recognition

Все contributors будут добавлены в [AUTHORS.md](AUTHORS.md).

Спасибо за ваш вклад! 🎉
