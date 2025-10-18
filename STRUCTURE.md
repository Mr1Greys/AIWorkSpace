# Структура проекта AIWorkSpace

## 📁 Текущая организация

Проект следует архитектуре, описанной в `docs/01-architecture.md`.

### Frontend (apps/web)

```
apps/web/src/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Главная страница
│   ├── about/                    # О платформе
│   ├── auth/                     # Авторизация
│   ├── brief/                    # Конструктор брифов
│   ├── cases/                    # Портфолио-кейсы
│   ├── chat/                     # Чат
│   ├── dashboard/                # Дашборд пользователя
│   ├── deal/                     # Управление сделками
│   ├── freelancers/              # Каталог специалистов
│   ├── help/                     # Помощь
│   ├── pricing/                  # Тарифы
│   ├── profile/                  # Профиль пользователя
│   ├── projects/                 # Проекты
│   ├── teams/                    # Команды
│   └── admin/                    # Админ-панель
│
├── components/                   # React компоненты
│   ├── brief/                    # Брив-конструктор
│   ├── match/                    # AI-матчинг
│   ├── cases/                    # Портфолио
│   ├── wallet/                   # Web3 wallet (TODO)
│   ├── chat/                     # Real-time чат
│   ├── deal/                     # Этапы сделки (TODO)
│   ├── dashboard/                # Дашборд модули
│   └── layout/                   # Layout компоненты
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Авторизация
│   └── useWallet.ts              # Web3 wallet
│
├── mocks/                        # Демонстрационные данные
│   └── projects.ts
│
├── store/                        # Zustand state management
│   └── projectStore.ts           # Демонстрационный стор проектов
│
├── types/                        # Общие типы для фронтенда
│   └── project.ts
│
├── lib/                          # Библиотеки и конфигурация
│   ├── wagmi.ts                  # Web3 config (TODO)
│   └── socket.ts                 # Socket.io config (TODO)
│
├── utils/                        # Утилиты
│   ├── format.ts                 # Форматирование
│   ├── validation.ts             # Валидация
│   └── api.ts                    # API клиент
│
├── styles/                       # Стили
│   ├── globals.css               # Глобальные стили
│   └── themes.css                # Темы и переменные
│
└── contexts/                     # React contexts
    └── RoleContext.tsx
```

### Backend (apps/api)

```
apps/api/src/
├── modules/                      # NestJS модули
│   ├── auth/                     # Авторизация
│   ├── users/                    # Пользователи
│   ├── briefs/                   # Брифы
│   ├── matching/                 # AI-матчинг
│   ├── cases/                    # Кейсы
│   ├── chat/                     # Real-time чат
│   ├── escrow/                   # Эскроу
│   ├── notifications/            # Уведомления
│   └── upload/                   # Хранение файлов
│
├── prisma/                       # Prisma ORM
│   ├── schema.prisma
│   └── migrations/
│
├── common/                       # Shared code
│   ├── prisma/                   # PrismaService
│   └── logger/                   # Winston logger
│
└── main.ts                       # Entry point
```

### Smart Contracts (apps/contracts)

```
apps/contracts/
├── contracts/                    # Solidity контракты
│   ├── SimpleEscrow.sol
│   ├── WorkProof.sol
│   └── interfaces/
│
├── scripts/                      # Deployment scripts
│   ├── deploy.ts
│   └── verify.ts
│
└── test/                         # Contract tests
    ├── SimpleEscrow.test.ts
    └── WorkProof.test.ts
```

### Shared Packages

```
packages/
├── shared/                       # Shared types & DTOs
│   ├── src/
│   └── dist/ (собирается автоматически)
│
└── ui/                           # Shared UI components
    ├── components/
    ├── lib/
    └── index.ts
```

## 📚 Документация

```
docs/
├── 01-architecture.md            # Архитектура и технологии
├── 02-backend-api.md             # Backend API
├── 03-smart-contracts.md         # Smart Contracts
├── 04-database.md                # База данных
├── 05-security.md                # Безопасность
├── 06-deployment.md              # Deployment & Monitoring
├── 07-portfolio-cases.md         # Портфолио-кейсы
├── 08-catalog-freelancers.md     # Каталог специалистов
└── 09-pricing-page.md            # Страница тарифов
```

## 🎯 Статус реализации

### ✅ Готово
- Базовая структура проекта
- Документация
- UI компоненты (packages/ui: Button, Input, Card)
- Компоненты брифов (BriefWizard)
- Компоненты матчинга (MatchList)
- Компоненты кейсов (CaseCard)
- Компоненты чата (ChatBox)
- Хуки (useAuth, useWallet)
- Утилиты (format, validation, api)
- Стили и темы

### 🚧 В разработке
- Страницы приложения
- Zustand stores (projectStore)
- Web3 интеграция (wagmi)
- Socket.io интеграция
- Backend API модули
- Smart contracts

### 📋 TODO
- Wallet компоненты
- Deal компоненты
- Admin панель
- Тесты (Jest, Playwright)
- CI/CD pipelines
- Docker конфигурация

## 🔧 Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск фронтенда
cd apps/web
npm run dev

# Запуск бэкенда
cd apps/api
npm run start:dev

# Запуск всего проекта (с Turbo)
npm run dev

# Тесты
npm run test

# Линтинг
npm run lint

# Сборка
npm run build
```

## 📖 Дополнительная информация

- **Главная спецификация**: `docs/specs/AIWORKSPACE_SPEC.md`
- **Архитектура**: `docs/01-architecture.md`
- **Статус страниц**: `docs/internal/PAGES_STATUS.md`
- **Тестовые пользователи**: `docs/internal/TEST_USERS.md`

---

**Последнее обновление**: 19 октября 2025
