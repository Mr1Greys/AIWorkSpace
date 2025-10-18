# 🏠 Dashboard - Личный кабинет

Личный кабинет платформы с **разделением по ролям** (Freelancer / Client).

## 📁 Новая структура

```
dashboard/
├── page.tsx                    # Редирект на соответствующую роль
├── layout.tsx                  # Общий layout с Sidebar
│
├── (freelancer)/              # 👨‍💻 Страницы для исполнителей
│   ├── layout.tsx             # Проверка роли + редирект
│   ├── README.md              # Документация
│   ├── overview/              # /dashboard/overview (главная)
│   ├── my-bids/               # /dashboard/my-bids (отклики)
│   ├── my-projects/           # /dashboard/my-projects (заказы)
│   └── portfolio/             # /dashboard/portfolio (портфолио)
│       ├── page.tsx
│       └── new/
│
├── (client)/                  # 💼 Страницы для заказчиков
│   ├── layout.tsx             # Проверка роли + редирект
│   ├── README.md              # Документация
│   ├── overview/              # /dashboard/overview (главная)
│   ├── my-projects/           # /dashboard/my-projects (проекты)
│   │   ├── page.tsx
│   │   └── new/
│   └── hired-freelancers/     # /dashboard/hired-freelancers
│
└── (shared)/                  # 🔄 Общие страницы для обеих ролей
    ├── README.md              # Документация
    ├── settings/              # /dashboard/settings
    ├── messages/              # /dashboard/messages
    ├── finances/              # /dashboard/finances
    ├── balance/               # /dashboard/balance
    ├── reviews/               # /dashboard/reviews
    └── teams/                 # /dashboard/teams
```

## 🎯 Ключевые концепции

### Route Groups
- `(freelancer)`, `(client)`, `(shared)` - **не влияют на URL**
- Используются только для организации кода
- `/dashboard/overview` работает для обеих ролей (свой layout выбирает нужную страницу)

### Проверка ролей
- Каждый route group имеет `layout.tsx` с проверкой роли
- При несоответствии роли → редирект на правильную страницу
- `(shared)` - адаптивные компоненты для обеих ролей

### Shared компоненты
Используйте компоненты из `/components/shared/cards/`:
```tsx
import { FreelancerCard, ProjectCard, EventItem } from '@/components/shared/cards';
```

## 📝 Миграция

### Было (старое):
```
/dashboard/freelancer/      → главная исполнителя
/dashboard/client/          → главная заказчика
/dashboard/freelancers/     → список исполнителей (сбивало с толку!)
/dashboard/bids/            → отклики
/dashboard/projects/        → проекты
/dashboard/portfolio/       → портфолио
```

### Стало (новое):
```
/dashboard/overview               → главная (зависит от роли)
/dashboard/my-bids               → отклики (только freelancer)
/dashboard/my-projects           → проекты/заказы (оба)
/dashboard/portfolio             → портфолио (только freelancer)
/dashboard/hired-freelancers     → нанятые (только client)
/dashboard/settings              → настройки (оба)
```

## ✅ Преимущества

1. **Понятная навигация**: Четкое разделение freelancer/client
2. **Нет путаницы**: "freelancers" переименовано в "hired-freelancers"
3. **Переиспользование**: Shared компоненты вместо дублей
4. **Безопасность**: Layout проверяет роль на каждой странице
5. **Масштабируемость**: Легко добавлять новые страницы

## 🚀 Как добавить новую страницу

### Для исполнителя:
```bash
mkdir apps/web/src/app/dashboard/(freelancer)/my-feature
# Создайте page.tsx
```

### Для заказчика:
```bash
mkdir apps/web/src/app/dashboard/(client)/my-feature
# Создайте page.tsx
```

### Для обеих ролей:
```bash
mkdir apps/web/src/app/dashboard/(shared)/my-feature
# Создайте page.tsx с проверкой currentRole
```

## 🔗 Обновление ссылок

При изменении навигации обновите:
1. **Sidebar** (`/components/layout/Sidebar.tsx`)
2. **Редиректы** в `page.tsx` главного dashboard
3. **Документацию** в этом README

---

**Дата рефакторинга**: 18 октября 2025
**Версия**: 2.0 (новая структура с route groups)
