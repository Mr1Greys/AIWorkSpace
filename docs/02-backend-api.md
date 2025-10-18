# Backend API (NestJS)

## 📡 Модули системы

### 🔸 Auth Module
- OAuth (GitHub, LinkedIn, Telegram)
- SIWE (Sign-In with Ethereum)
- JWT tokens + refresh tokens

### 🔸 Users Module
- CRUD профилей
- Теги навыков (GIN index)
- Кэширование в Redis (TTL 1h)
- Поиск по тегам и имени

### 🔸 Briefs Module
- Создание заданий
- AI-тегирование (OpenAI API)
- Fallback на keyword matching
- Асинхронный матчинг через Bull Queue

### 🔸 Match Module

**AI-алгоритм подбора:**

```typescript
score = 0.35 * tagMatch +
        0.20 * pastSuccess +
        0.15 * availability +
        0.15 * budgetFit +
        0.10 * reliability +
        0.05 * responseSpeed
```

**Процесс:**
1. Получение embedding брифа (OpenAI)
2. Поиск доступных фрилансеров
3. Векторное сравнение + multi-factor scoring
4. Cold-start boost (+10% для новичков)
5. Кэширование (TTL 5min)

### 🔸 Offers Module
- Rate limiting: 5/день (free), unlimited (Pro)
- Короткий формат отклика
- Уведомления клиенту

### 🔸 Escrows Module

**Функции:**
- `createAndFund` — создание и финансирование
- `submitWork` — отправка работы
- `approveRelease` — выплата
- `raiseDispute` — открытие спора

**Event listener:**
```typescript
contract.on('WorkSubmitted', async (dealId) => {
  await prisma.escrow.update({ status: 'submitted' });
  await notificationService.send({ type: 'work_submitted' });
});
```

### 🔸 Cases Module
- Max 10 кейсов на пользователя
- Max 20MB на файл
- Virus scan (ClamAV)
- S3 + IPFS storage
- Signed URLs для приватных файлов

### 🔸 Chat Module (Socket.io)

**События:**
```typescript
// Join room
socket.emit('join', projectId);

// Send message
socket.emit('send-message', { projectId, text, senderId });

// Typing indicator
socket.emit('typing', { projectId, userId });

// Receive messages
socket.on('new-message', (message) => {});
```

### 🔸 Notifications Module

**Bull Queue processor:**
1. Email (Nodemailer)
2. Push (Firebase Cloud Messaging)
3. Retry logic (3 attempts, exponential backoff)

**Типы уведомлений:**
- `new_offer` — новый отклик
- `payment_received` — оплата получена
- `work_submitted` — работа отправлена
- `work_approved` — работа одобрена
- `dispute_raised` — открыт спор
- `new_message` — новое сообщение

### 🔸 Monitoring Module

```typescript
// Health check
GET /health
{
  "status": "healthy",
  "services": {
    "database": true,
    "redis": true,
    "blockchain": true
  }
}

// Metrics (Prometheus)
GET /metrics
```

### 🔸 Admin Module
- Решение споров (вызов smart contract)
- Модерация кейсов
- Система страйков (3 → бан)
- Статистика платформы

---

## 📊 API Endpoints

### Auth
```
POST   /auth/oauth/github
GET    /auth/oauth/github/callback
POST   /auth/siwe/verify
GET    /auth/profile
POST   /auth/logout
```

### Users
```
GET    /users
GET    /users/search?q=react
GET    /users/:id
PATCH  /users/:id
POST   /users/:id/verify-email
```

### Briefs
```
POST   /briefs
GET    /briefs?status=open&tags=react
GET    /briefs/:id
PATCH  /briefs/:id
DELETE /briefs/:id
```

### Match
```
GET    /match/brief/:id
GET    /match/freelancer/:id/briefs
```

### Projects
```
GET    /projects
GET    /projects/:id
POST   /projects/:id/invite
PATCH  /projects/:id/status
```

### Offers
```
POST   /offers
GET    /offers/:id
GET    /offers/project/:id
PATCH  /offers/:id/accept
DELETE /offers/:id
```

### Escrows
```
POST   /escrows/create-and-fund
POST   /escrows/:id/submit-work
POST   /escrows/:id/approve-release
POST   /escrows/:id/raise-dispute
GET    /escrows/:id/status
```

### Cases
```
POST   /cases
POST   /cases/upload
GET    /cases/:id
GET    /cases/freelancer/:id
PATCH  /cases/:id
DELETE /cases/:id
```

### Reviews
```
POST   /reviews
GET    /reviews/project/:id
GET    /reviews/user/:id
```

### Admin
```
POST   /admin/disputes/:id/resolve
POST   /admin/cases/:id/moderate
POST   /admin/users/:id/warn
GET    /admin/stats
```

---

## 🔒 Security

### Rate Limiting
```typescript
// Global
@Throttle(100, 60)  // 100 req/min

// Auth endpoints
@Throttle(10, 60)   // 10 req/min

// Offers (free tier)
@Throttle(5, 86400) // 5/день
```

### Guards
```typescript
@UseGuards(JwtAuthGuard)              // JWT authentication
@UseGuards(RolesGuard)                // Role-based access
@UseGuards(OwnerGuard)                // Resource ownership
@UseGuards(EscrowCompletedGuard)      // Escrow validation
```

### Validation
```typescript
// DTOs with class-validator
export class CreateBriefDto {
  @IsString()
  @Length(10, 200)
  title: string;
  
  @IsArray()
  @ArrayMaxSize(10)
  tags: string[];
  
  @IsInt()
  @Min(100)
  budgetMin: number;
}
```

---

## ⚡ Performance

### Caching Strategy
```typescript
// User profiles
@CacheTTL(3600)  // 1 hour

// Match results
@CacheTTL(300)   // 5 min

// Popular tags
@CacheTTL(86400) // 24 hours
```

### Database Optimization
- Connection pooling (max 20)
- Query timeout (30s)
- Prepared statements
- Batch operations

### Queue Management
```typescript
// Bull Queue options
{
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: true,
  removeOnFail: false
}
```

---

[← Назад к оглавлению](../specs/AIWORKSPACE_SPEC.md) | [Далее: Smart Contracts →](03-smart-contracts.md)
