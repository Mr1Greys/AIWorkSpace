# 📦 Shared Components

Общие переиспользуемые компоненты для всего приложения.

## 📁 Структура

```
shared/
├── cards/              # Карточные компоненты
│   ├── FreelancerCard  # Карточка исполнителя (3 варианта)
│   ├── ProjectCard     # Карточка проекта (3 варианта)
│   ├── EventItem       # Элемент ленты событий
│   └── QuickStatCard   # Карточка статистики
├── forms/              # Формы (будет добавлено)
└── modals/             # Модальные окна (будет перемещено)
```

## 🎯 Использование

### FreelancerCard

```tsx
import { FreelancerCard } from '@/components/shared/cards';

// Компактный вариант (для списков)
<FreelancerCard 
  name="Иван Петров"
  headline="Full-stack разработчик"
  rating={4.9}
  projects={12}
  variant="compact"
/>

// Grid вариант (для дашборда)
<FreelancerCard 
  name="Иван Петров"
  role="Full-stack разработчик"
  currentProject="Разработка API"
  daysLeft={5}
  variant="grid"
/>

// Full вариант (по умолчанию)
<FreelancerCard 
  name="Иван Петров"
  headline="Full-stack разработчик"
  rating={4.9}
  projects={12}
  status="active"
  variant="full"
/>
```

### ProjectCard

```tsx
import { ProjectCard } from '@/components/shared/cards';

// Для заказчика
<ProjectCard 
  id="1"
  title="Разработка мобильного приложения"
  budgetMax={5000}
  applicants={12}
  status="reviewing"
  variant="client"
/>

// Для исполнителя
<ProjectCard 
  id="1"
  title="Разработка мобильного приложения"
  budget={5000}
  daysLeft={7}
  status="in-progress"
  variant="freelancer"
/>

// Публичный
<ProjectCard 
  id="1"
  title="Разработка мобильного приложения"
  budgetMin={3000}
  budgetMax={5000}
  applicants={12}
  variant="public"
/>
```

### EventItem

```tsx
import { EventItem } from '@/components/shared/cards';
import { CheckCircle } from 'lucide-react';

<EventItem 
  icon={<CheckCircle className="h-5 w-5 text-green-600" />}
  title="Получена выплата"
  description="$1,200 от John Doe"
  time="2 часа назад"
/>
```

### QuickStatCard

```tsx
import { QuickStatCard } from '@/components/shared/cards';
import { DollarSign } from 'lucide-react';

<QuickStatCard 
  icon={<DollarSign className="h-5 w-5" />}
  label="Заработано"
  value="$12,450"
  subtitle="За последний месяц"
  color="green"
  trend="up"
  trendValue="+15%"
/>
```

## ✅ Преимущества

- **Единый источник истины**: Один компонент вместо нескольких копий
- **Консистентность**: Одинаковый UI/UX во всем приложении
- **Простота поддержки**: Изменения в одном месте
- **Типобезопасность**: TypeScript интерфейсы для всех props
- **Документация**: Комментарии и примеры использования
