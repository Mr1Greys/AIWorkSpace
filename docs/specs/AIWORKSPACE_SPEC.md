# AIWorkSpace — Техническая спецификация

> **Версия:** 1.1  
> **Дата:** Октябрь 2025  
> **Статус:** Ready for Development

---

## 📍 Описание проекта

**AIWorkSpace** — современная web2.5-платформа для IT и AI-фрилансеров.

### Главная цель
Объединить специалистов и компании без перегруженного UX и токсичных комиссий, с интеллектуальным подбором, безопасными сделками и современным дизайном.

### Отличия от классических бирж
- ❌ Нет «кворков» и шаблонных услуг
- ✅ Брив-конструктор с формированием задания по тегам и стэку
- ✅ Автоматический подбор релевантных специалистов
- ✅ AI-матчинг, портфолио-кейсы и web3-эскроу для прозрачных расчетов

---

## 📚 Документация

Полная техническая документация разбита на модули:

1. **[Архитектура и технологии](docs/01-architecture.md)**
   - Технический стек
   - Структура проекта
   - Frontend (Next.js)
   - Backend (NestJS)
   - Blockchain Layer

2. **[Backend API](docs/02-backend-api.md)**
   - Модули системы
   - API endpoints
   - AI-матчинг алгоритм
   - Real-time коммуникация
   - Notifications

3. **[Smart Contracts](docs/03-smart-contracts.md)**
   - SimpleEscrow.sol
   - WorkProof.sol
   - Gas optimization
   - Security best practices

4. **[База данных](docs/04-database.md)**
   - Prisma схема
   - Таблицы и отношения
   - Критичные индексы
   - Миграции

5. **[Безопасность](docs/05-security.md)**
   - Rate limiting
   - Input validation
   - File upload security
   - Anti-abuse механизмы

6. **[Deployment & Monitoring](docs/06-deployment.md)**
   - CI/CD pipelines
   - Docker setup
   - Monitoring & logging
   - Backup strategy

7. **[Портфолио-кейсы](docs/07-portfolio-cases.md)**
   - Структура кейсов
   - UI/UX отображения
   - AI-помощник при добавлении
   - Влияние на матчинг
   - Интеграция в экосистему

8. **[Каталог специалистов](docs/08-catalog-freelancers.md)**
   - Структура страницы
   - Фильтры и поиск
   - AI-релевантность
   - Пресеты направлений

9. **[Страница тарифов](docs/09-pricing-page.md)**
   - Тарифные планы
   - Способы оплаты
   - FAQ и преимущества

---

## ⚡ Quick Start

### Prerequisites
```bash
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose
```

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/your-org/aiworkspace.git
cd aiworkspace

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Start infrastructure
docker-compose up -d

# 5. Run migrations
cd apps/api
npx prisma migrate dev

# 6. Seed database (optional)
npm run seed

# 7. Start backend
npm run start:dev

# 8. Start frontend (new terminal)
cd apps/web
npm run dev

# 9. Deploy contracts (new terminal)
cd apps/contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localhost
```

---

## 🎯 MVP Roadmap

### Phase 1: Core Features (2-3 месяца)
- [x] Структура проекта и документация
- [x] Базовые UI компоненты (Button, Input, Card)
- [x] Компоненты брифов (BriefWizard)
- [x] Компоненты матчинга (MatchList)
- [x] Компоненты кейсов (CaseCard)
- [x] Компоненты чата (ChatBox)
- [x] Хуки (useAuth, useWallet)
- [x] Утилиты (format, validation, api)
- [ ] Auth (OAuth + SIWE)
- [ ] User profiles (tags, rates)
- [ ] AI matching engine
- [ ] Case portfolio upload
- [ ] Smart contract escrow
- [ ] Real-time chat integration
- [ ] Reviews & ratings

### Phase 2: Advanced (3-4 месяца)
- [ ] Pro subscriptions
- [ ] Admin panel & disputes
- [ ] Email/Push notifications
- [ ] Advanced analytics
- [ ] Mobile optimization

### Phase 3: Scale (4-6 месяцев)
- [ ] Teams support
- [ ] EAS attestations
- [ ] Multi-chain support
- [ ] DAO governance

---

## 💰 Монетизация

| Tier | Цена | Возможности |
|------|------|------------|
| **Free** | $0 | 5 откликов/мес, базовый профиль |
| **Pro** | $10-30/мес | Неограниченные отклики, приоритет в матчах |
| **Platform Fee** | 3-5% | Комиссия с escrow транзакций |
| **Баунти** | $2-5 | Платное размещение задачи |

---

## 🧠 Роли пользователей

| Роль | Описание |
|------|----------|
| **Исполнитель** | Создаёт профиль с тегами, откликается на брифы, получает оплату через escrow |
| **Заказчик** | Создаёт бриф, выбирает исполнителя, оплачивает через escrow, оставляет отзыв |
| **Арбитр** | Решает споры, модерация, система страйков |

---

## 🛠️ Технологии

| Слой | Технологии |
|------|-----------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind, Zustand |
| **Backend** | NestJS, PostgreSQL, Prisma, Redis, Socket.io |
| **Blockchain** | Base L2, USDC, Hardhat, Ethers.js, OpenZeppelin |
| **AI** | OpenAI GPT-4, embeddings, LangChain |
| **Infra** | Docker, GitHub Actions, Sentry, Prometheus |

---

## 🔥 Ключевые фичи

### 1. AI-матчинг
Интеллектуальный подбор исполнителей на основе:
- Векторного сравнения (embeddings)
- Multi-factor scoring (теги, рейтинг, доступность, бюджет)
- Cold-start поддержка новичков

### 2. Web3 Escrow
- Прозрачные расчёты через USDC на Base L2
- Auto-release через 7 дней
- Арбитраж через multi-sig (Gnosis Safe)

### 3. Real-time коммуникация
- WebSocket чат (Socket.io)
- Typing indicators
- Push notifications для offline пользователей

### 4. Портфолио-кейсы
- Структурированные портфолио-карточки (не просто галерея)
- 3–10 кейсов с полями: название, описание, теги, бюджет, срок, ссылки, превью
- Типы работ: Product, Automation, AI-solution, Design, Bot, Backend, Web3
- Видимость: Public / Link-only (NDA) / Private
- S3 + IPFS storage, лимит 20MB
- AI-помощник при добавлении (извлечение из GitHub/Figma)
- Автозаполнение из завершённых проектов
- Влияние на AI-матчинг (+30% boost за релевантные кейсы)
- Портфолио-линк: `username.aiworkspace.io`

---

## 🚨 Критичные требования

Перед началом разработки убедитесь:

- [x] Rate limiting настроен
- [x] Database indexes созданы
- [x] Redis caching strategy определена
- [x] Smart contracts gas-оптимизированы
- [x] File upload security (ClamAV)
- [x] Monitoring setup (Sentry)
- [x] CI/CD pipelines готовы
- [x] Staging environment настроен

---

## 📊 Success Metrics (KPIs)

| Метрика | Цель (3 месяца) |
|---------|-----------------|
| Registered users | 1,000+ |
| Active projects | 100+ |
| Escrow transactions | 50+ |
| Total volume | $50,000+ |
| Avg match score | 0.75+ |
| Platform uptime | 99.9% |

---

## 📞 Support

- **Docs:** `/docs`
- **API:** `/api/docs` (Swagger)
- **Email:** support@aiworkspace.io

---

## 📝 Changelog

### v1.1 (October 2025)
- ✅ Socket.io для real-time чата
- ✅ Notifications (email + push)
- ✅ Monitoring module
- ✅ Database indexes
- ✅ Security improvements
- ✅ Gas optimization
- ✅ CI/CD pipelines
- ✅ Детальная спецификация портфолио-кейсов

### v1.0 (Initial)
- Базовая архитектура
- Основные модули
