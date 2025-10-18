# Портфолио-кейсы: как исполнители демонстрируют работы

## 📋 Концепция

**LinkedIn × GitHub × Behance** в одном месте:
- Структурированные портфолио-карточки (не просто галерея)
- Доказательство реальности работ (через escrow или EAS-proof)
- Портфолио = часть системы репутации
- Кейсы участвуют в AI-матчинге

---

## 1️⃣ Структура кейса

### Лимиты
- **3–10 кейсов** на исполнителя
- Один кейс = структурированный блок

### Поля

| Поле | Описание | Пример |
|------|----------|--------|
| 🏷️ Название | Краткое название | "Telegram бот с оплатой Stripe" |
| 💡 Описание | Результат (1–2 предложения) | "Сократил время ответов на 70%" |
| ⚙️ Технологии | Теги | `#nextjs` `#telegram-bot` `#pytorch` |
| 💰 Объём/срок | Примерно | "$1200 / 7 дней" |
| 🔗 Ссылки | GitHub, демо, сайт | URLs |
| 🖼️ Превью | Скриншот/видео/gif | `.jpg`, `.png`, `.mp4` |
| 🧠 Тип работы | Категория | Product, Automation, AI, Design, Bot |
| 🌐 Доступность | Видимость | Public / Link-only (NDA) / Private |

### Типы работ

```typescript
enum CaseType {
  PRODUCT, AUTOMATION, AI_SOLUTION, DESIGN, 
  BOT, BACKEND, WEB3, MOBILE
}
```

### Видимость

```typescript
enum CaseVisibility {
  PUBLIC = 'public',        // Виден всем
  LINK_ONLY = 'link_only',  // Только по ссылке (NDA)
  PRIVATE = 'private'       // Скрыт, но участвует в матчинге
}
```

---

## 2️⃣ Хранение

### Web2 (MVP)

**Хранение:** S3 / Cloudflare R2  
**Лимит:** 20 МБ на кейс  
**Форматы:** `.jpg`, `.png`, `.gif`, `.mp4`, `.pdf`, `.fig`

**Обработка:**
- Генерация thumbnail (16:9, 640x360)
- Compression + optimization
- IPFS-CID опционально (для будущего)

### Web3 (расширение)

```solidity
// WorkProof.sol
struct Proof {
    address freelancer;
    bytes32 workHash;  // keccak256(file)
    string title;
    string tags;
    uint256 timestamp;
}
```

**Преимущества:**
- On-chain портфолио
- NFT-бейджи за проекты
- Proof of work для репутации

---

## 3️⃣ UI отображения

### Профиль исполнителя

**Вкладка "Портфолио":**
- Сетка **3×2** (desktop) / **1 column** (mobile)
- Hover → показать стек + описание
- Клик → модалка с деталями
- Фильтр по тегам

### Пример карточки

```
──────────────────────────────
🖼️ [Превью]
──────────────────────────────
📄 RAG-помощник для поддержки
⚙️ #python #langchain #fastapi
💬 "Сократил время ответов на 70%"
⏱️ 5 дней • 💰 $900
🔗 [Demo] [GitHub]
──────────────────────────────
```

### React компонент

```typescript
// CaseCard.tsx
<div className="group relative cursor-pointer">
  <div className="aspect-video relative">
    <Image src={case.thumbnailUrl} fill />
    
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100">
      <p>{case.description}</p>
      <TagList tags={case.tags} />
    </div>
  </div>
  
  <div className="p-4">
    <h3>{case.title}</h3>
    <div className="flex gap-4 text-sm">
      <span>⏱️ {case.durationDays} дней</span>
      <span>💰 ${case.budget}</span>
    </div>
  </div>
</div>
```

---

## 4️⃣ Добавление кейса

### UX Flow

1. **Кнопка "Добавить работу"** в профиле
2. **Multi-step форма:**
   - Название + описание
   - Технологии + тип работы
   - Бюджет + срок + ссылки
   - Загрузка превью + видимость

### AI-помощник

```typescript
// Extract from GitHub
async extractFromGithub(repoUrl: string) {
  const repo = await fetch(`https://api.github.com/repos/${repoUrl}`);
  const readme = await fetch(repo.readme_url);
  
  // Use OpenAI to extract
  return {
    title: repo.name,
    description: repo.description,
    tags: await this.extractTags(readme)
  };
}
```

**Подсказки:**
- "Добавьте конкретные метрики (рост конверсии, экономия времени)"
- "Укажите проблему, которую решили"
- "Опишите технические челленджи"

### Автозаполнение из проекта

```typescript
// Link case to completed project
async linkToProject(caseId: string, projectId: string) {
  const project = await this.getProject(projectId);
  
  await this.prisma.case.update({
    where: { id: caseId },
    data: {
      projectId,
      budget: project.escrow.amount,
      durationDays: calculateDuration(project),
      tags: project.brief.tags,
      rating: project.review?.rating
    }
  });
}
```

---

## 5️⃣ Влияние на AI-матчинг

### Кейсы как сигнал

```typescript
// Boost score based on cases
async calculateCaseBoost(freelancer, brief) {
  const relevantCases = await this.findRelevantCases(
    freelancer.id, 
    brief.tags
  );
  
  let boost = 0;
  
  // +5% per matching tag
  boost += matchingTagsCount * 0.05;
  
  // +3% per recent case (last 6 months)
  boost += recentCases.length * 0.03;
  
  // +7% per high-rated case (4.5+)
  boost += highRatedCases.length * 0.07;
  
  // +4% per similar budget case
  boost += similarBudgetCases.length * 0.04;
  
  return Math.min(boost, 0.3); // Max 30%
}
```

### Приоритизация

- Если заказчик ищет `#telegram-bot` → приоритет у тех, у кого есть релевантные кейсы
- Кейсы с высокой оценкой → сильнее влияют на ранжирование

---

## 6️⃣ Продвинутые фичи

### Портфолио-линк
`username.aiworkspace.io` — публичный URL с:
- Тёмной/светлой темой
- Экспортом в PDF
- QR-кодом для шеринга
- Analytics (views, clicks)

### Импорт из внешних платформ
- **GitHub:** автоматический импорт репозиториев
- **Figma:** импорт дизайнов
- **Behance:** импорт проектов

### WorkProof NFT (будущее)
Возможность "запечатать" кейс как NFT с хэшем и подписью исполнителя.

---

## 7️⃣ Категории кейсов

```typescript
const CATEGORIES = {
  WEB: ['Landing', 'SaaS', 'Dashboard', 'E-commerce'],
  BACKEND: ['API', 'Microservices', 'Database'],
  MOBILE: ['iOS', 'Android', 'React Native'],
  DESIGN: ['UI/UX', 'Branding', 'Illustration'],
  
  // AI-специфика
  AI: ['Модели', 'RAG-системы', 'LLM-агенты', 'Data pipelines', 'ML Ops'],
  
  // Web3-специфика
  WEB3: ['Смарт-контракты', 'DEX', 'NFT', 'Audit', 'DeFi', 'DAO'],
  
  AUTOMATION: ['Bots', 'Scrapers', 'CI/CD', 'Integrations']
};
```

---

## 8️⃣ Интеграция в экосистему

### При завершении сделки

```typescript
// After escrow release
async onProjectCompleted(projectId: string) {
  // Ask client for portfolio permission
  await this.notificationService.send({
    to: clientId,
    type: 'portfolio_permission_request',
    message: 'Разрешить исполнителю добавить проект в портфолио?'
  });
}

// If approved → auto-create case
await this.prisma.case.create({
  data: {
    title: project.brief.title,
    budget: project.escrow.amount,
    rating: project.review.rating,
    visibility: nda ? 'private' : 'public'
  }
});
```

### NDA-проекты

```typescript
// Hidden but counts in matching
const ndaCases = await this.prisma.case.findMany({
  where: { visibility: 'private' }
});

// Extract tags for matching (don't show details)
const ndaTags = ndaCases.flatMap(c => c.tags);
```

---

## 9️⃣ JSON Schema

```json
{
  "id": "case_231",
  "freelancer_id": "u_123",
  "project_id": "proj_456",
  "title": "Telegram бот с оплатой Stripe",
  "description": "Разработал бота с интеграцией Stripe. 500+ платежей/день.",
  "tags": ["#telegram-bot", "#nestjs", "#stripe"],
  "type": "bot",
  "budget": 800,
  "duration_days": 6,
  "links": {
    "demo": "https://t.me/demo_bot",
    "github": "https://github.com/user/demo"
  },
  "media": [{
    "url": "https://cdn.platform.ai/cases/231/preview.png",
    "thumbnail_url": "https://cdn.platform.ai/cases/231/thumb.jpg",
    "type": "image"
  }],
  "visibility": "public",
  "status": "published",
  "rating": 4.8,
  "views": 1234,
  "ipfs_cid": "Qm...",
  "created_at": "2025-01-15T10:00:00Z"
}
```

---

## 🎯 Итого

✅ **Структурно** — не просто картинки, а полноценные кейсы  
✅ **Красиво** — современный UX как у топовых платформ  
✅ **Доказуемо** — привязка к escrow или on-chain proof  
✅ **Функционально** — влияет на матчинг и репутацию  
✅ **Гибко** — поддержка NDA-проектов  

[← Назад: Deployment](06-deployment.md) | [Назад к оглавлению](../specs/AIWORKSPACE_SPEC.md)
