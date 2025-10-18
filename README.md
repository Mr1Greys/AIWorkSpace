# AIWorkSpace

> Современная web2.5-платформа для IT и AI-фрилансеров

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)

---

## 📋 О проекте

AIWorkSpace — умная платформа для фрилансеров и заказчиков из IT/AI-сферы. Объединяем специалистов и компании без перегруженного UX и токсичных комиссий, с интеллектуальным подбором, безопасными сделками и современным дизайном.

### Ключевые особенности

- 🤖 **AI-матчинг** — интеллектуальный подбор исполнителей
- ⛓️ **Web3 Escrow** — прозрачные расчёты через USDC на Base L2
- 💬 **Real-time чат** — WebSocket коммуникация
- 📦 **Портфолио-кейсы** — структурированные портфолио-карточки с AI-помощником
- 🔔 **Уведомления** — Email + Push notifications
- 🎯 **Брив-конструктор** — пошаговое создание задачи
- 🌐 **Портфолио-линк** — персональный URL `username.aiworkspace.io`

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
PostgreSQL 15+
Redis 7+
Docker & Docker Compose
```

### Automated Setup (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/your-org/aiworkspace.git
cd aiworkspace

# 2. Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. Update .env.local with your API keys

# 4. Start development
npm run dev
```

### Manual Setup

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
npx prisma generate

# 6. Seed database (optional)
npm run seed

# 7. Start all services
cd ../..
npm run dev
```

Откройте:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Prisma Studio**: `make prisma-studio`

---

## 📚 Документация

Полная техническая документация:

1. **[Архитектура и технологии](docs/01-architecture.md)**
   - Технический стек
   - Структура проекта
   - Frontend и Backend архитектура

2. **[Backend API](docs/02-backend-api.md)**
   - Модули системы
   - API endpoints
   - AI-матчинг алгоритм

3. **[Smart Contracts](docs/03-smart-contracts.md)**
   - SimpleEscrow.sol
   - Gas optimization
   - Security best practices

4. **[База данных](docs/04-database.md)**
   - Prisma схема
   - Критичные индексы
   - Миграции

5. **[Безопасность](docs/05-security.md)**
   - Rate limiting
   - Input validation
   - Anti-abuse механизмы

6. **[Deployment & Monitoring](docs/06-deployment.md)**
   - Docker setup
   - CI/CD pipelines
   - Monitoring

7. **[Портфолио-кейсы](docs/07-portfolio-cases.md)**
   - Структура кейсов
   - UI/UX отображения
   - AI-помощник
   - Влияние на матчинг

8. **[Каталог специалистов](docs/08-catalog-freelancers.md)**
   - Структура страницы
   - Фильтры и поиск
   - AI-релевантность

9. **[Страница тарифов](docs/09-pricing-page.md)**
   - Тарифные планы
   - Способы оплаты
   - FAQ

Главный спецификационный документ: **[AIWORKSPACE_SPEC.md](docs/specs/AIWORKSPACE_SPEC.md)**  
Структура проекта: **[STRUCTURE.md](STRUCTURE.md)**

---

## 🛠️ Технологии

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- Wagmi (Web3)

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- Redis
- Socket.io
- Bull Queue

### Blockchain
- Base L2
- USDC
- Hardhat
- Ethers.js
- OpenZeppelin

### AI
- OpenAI GPT-4
- Embeddings
- LangChain

### DevOps
- Docker
- GitHub Actions
- Prometheus
- Grafana
- Sentry

---

## 📁 Структура проекта

```
aiworkspace/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # NestJS backend
│   └── contracts/        # Hardhat smart contracts
├── packages/
│   ├── shared/           # Shared types & DTOs
│   ├── ui/               # UI components library
│   └── utils/            # Shared utilities
├── docs/                 # Documentation
├── scripts/              # Automation scripts
└── .github/              # CI/CD workflows
```

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov

# Contract tests
cd apps/contracts
npx hardhat test
```

---

## 🚢 Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### CI/CD
Push в `main` автоматически деплоит в production через GitHub Actions.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

См. [CONTRIBUTING.md](CONTRIBUTING.md) для деталей.

---

## 📊 Roadmap

### MVP (Q1 2025)
- [x] Структура проекта
- [x] Базовые UI компоненты
- [x] Компоненты брифов
- [x] Компоненты матчинга
- [x] Компоненты кейсов
- [x] Компоненты чата
- [x] Хуки и утилиты
- [ ] Auth (OAuth + SIWE)
- [ ] User profiles
- [ ] AI matching engine
- [ ] Escrow contracts
- [ ] Real-time chat integration
- [ ] Reviews

### v2 (Q2 2025)
- [ ] Pro subscriptions
- [ ] Admin panel
- [ ] Advanced analytics
- [ ] Mobile app

### v3 (Q3-Q4 2025)
- [ ] Teams support
- [ ] EAS attestations
- [ ] Multi-chain support
- [ ] DAO governance

---

## 📄 License

MIT License - см. [LICENSE](LICENSE) для деталей.

---

## 📞 Контакты

- **Website:** https://aiworkspace.io
- **Email:** support@aiworkspace.io
- **Discord:** [Join our community](#)
- **Twitter:** [@aiworkspace](#)

---

## 💎 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) — Smart contract libraries
- [Vercel](https://vercel.com/) — Hosting platform
- [Base](https://base.org/) — L2 blockchain
- [OpenAI](https://openai.com/) — AI capabilities

---

**Built with ❤️ by the AIWorkSpace team**
