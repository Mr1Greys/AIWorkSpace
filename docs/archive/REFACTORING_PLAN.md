# 🔧 План рефакторинга структуры проекта

## 📊 Текущие проблемы

### 1. **Дублирование компонентов**
- `FreelancerCard` - используется в 3 местах с разными реализациями:
  - `/app/dashboard/client/page.tsx` (строки 246-306)
  - `/app/dashboard/freelancers/page.tsx` (строки 77-143)
  - `/app/freelancers/page.tsx`
- `ProjectCard` - дублируется в:
  - `/app/dashboard/client/page.tsx`
  - `/app/dashboard/freelancer/page.tsx` (как `CurrentProjectCard`)
  - `/app/projects/page.tsx`
- `EventItem` - дублируется в:
  - `/app/dashboard/client/page.tsx`
  - `/app/dashboard/freelancer/page.tsx`
- `QuickStatCard` - дублируется в обоих dashboard файлах

### 2. **Путаница с ролями**
- `/app/dashboard/freelancer/page.tsx` - страница для роли "исполнитель"
- `/app/dashboard/client/page.tsx` - страница для роли "заказчик"
- `/app/dashboard/page.tsx` - редирект на основе роли
- `/app/dashboard/freelancers/page.tsx` - **непонятно**: для заказчика или исполнителя?

### 3. **Дублирование папок**
- `/app/freelancers/` - публичная страница поиска исполнителей
- `/app/dashboard/freelancers/` - личный кабинет с исполнителями заказчика
- Обе выполняют разные функции, но названия путают

### 4. **Backup файлы в production**
```
/app/dashboard/settings/
  ├── page-backup.tsx (35KB!)
  ├── page-old.tsx (9KB)
  └── page.tsx (27KB)
```
Backup файлы не должны быть в src/

### 5. **Нет разделения по ролям**
- Компоненты для разных ролей смешаны
- Нет общей библиотеки переиспользуемых компонентов
- Логика ролей размазана по всему приложению

### 6. **Отсутствие shared компонентов**
Каждая страница определяет свои локальные компоненты, даже если они идентичны

---

## ✅ Предлагаемая структура

```
apps/web/src/
├── app/
│   ├── (public)/                    # Публичные страницы
│   │   ├── page.tsx                 # Главная
│   │   ├── about/
│   │   ├── pricing/
│   │   ├── help/
│   │   ├── freelancers/             # Поиск исполнителей (публично)
│   │   ├── projects/                # Поиск проектов (публично)
│   │   ├── cases/                   # Публичное портфолио
│   │   └── teams/                   # Публичные команды
│   │
│   ├── (auth)/                      # Авторизация
│   │   └── auth/
│   │       ├── signin/
│   │       ├── signup/
│   │       └── callback/
│   │
│   ├── (app)/                       # Приватная часть (требует авторизации)
│   │   └── dashboard/
│   │       ├── layout.tsx           # Общий layout с Sidebar
│   │       ├── page.tsx             # Редирект по ролям
│   │       │
│   │       ├── (freelancer)/        # Только для исполнителей
│   │       │   ├── overview/        # Главная dashboard исполнителя
│   │       │   ├── my-bids/         # Мои отклики
│   │       │   ├── my-projects/     # Мои заказы
│   │       │   └── portfolio/       # Портфолио
│   │       │       ├── page.tsx
│   │       │       └── new/
│   │       │
│   │       ├── (client)/            # Только для заказчиков
│   │       │   ├── overview/        # Главная dashboard заказчика
│   │       │   ├── my-projects/     # Мои размещённые проекты
│   │       │   ├── hired-freelancers/ # Нанятые исполнители
│   │       │   └── invitations/     # Приглашения
│   │       │
│   │       └── (shared)/            # Общее для обеих ролей
│   │           ├── settings/        # Настройки профиля
│   │           ├── messages/        # Сообщения
│   │           ├── finances/        # Финансы
│   │           ├── balance/         # Баланс
│   │           ├── reviews/         # Отзывы
│   │           └── teams/           # Команды
│   │
│   ├── deal/                        # Работа со сделками
│   ├── chat/                        # Чат
│   ├── brief/                       # Бриф
│   └── profile/                     # Публичный профиль пользователя
│
├── components/
│   ├── shared/                      # Общие компоненты для всего приложения
│   │   ├── cards/
│   │   │   ├── FreelancerCard.tsx   # ✅ Единый компонент
│   │   │   ├── ProjectCard.tsx      # ✅ Единый компонент
│   │   │   ├── EventItem.tsx        # ✅ Единый компонент
│   │   │   ├── QuickStatCard.tsx    # ✅ Единый компонент
│   │   │   └── TeamCard.tsx
│   │   ├── forms/
│   │   │   ├── ProfileForm.tsx
│   │   │   └── ProjectForm.tsx
│   │   └── modals/
│   │       └── CreateTeamModal.tsx
│   │
│   ├── freelancer/                  # Компоненты только для исполнителей
│   │   ├── BidsList.tsx
│   │   ├── PortfolioGrid.tsx
│   │   └── FreelancerStats.tsx
│   │
│   ├── client/                      # Компоненты только для заказчиков
│   │   ├── HiredFreelancers.tsx
│   │   ├── ProjectApplicants.tsx
│   │   └── ClientStats.tsx
│   │
│   ├── dashboard/                   # Dashboard компоненты (общие)
│   │   ├── QuickActions.tsx
│   │   ├── ProfileProgress.tsx
│   │   └── ActivityFeed.tsx
│   │
│   ├── layout/                      # Layout компоненты
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── brief/                       # Компоненты брифа
│   ├── cases/                       # Компоненты кейсов
│   ├── chat/                        # Компоненты чата
│   ├── deal/                        # Компоненты сделок
│   ├── match/                       # Компоненты матчинга
│   ├── wallet/                      # Компоненты кошелька
│   └── ui/                          # UI kit (@aiworkspace/ui)
│
├── hooks/                           # Custom hooks
│   ├── useRole.ts
│   ├── useAuth.ts
│   └── useWallet.ts
│
├── contexts/                        # React Context
│   ├── RoleContext.tsx
│   └── AuthContext.tsx
│
├── store/                           # Zustand stores
│   ├── authStore.ts
│   ├── profileStore.ts
│   ├── projectStore.ts
│   ├── portfolioStore.ts
│   ├── chatStore.ts
│   └── walletStore.ts
│
├── lib/                             # Утилиты и конфиги
│   ├── api/                         # API клиенты
│   ├── utils/                       # Вспомогательные функции
│   └── constants/                   # Константы
│
└── types/                           # TypeScript типы
    ├── user.ts
    ├── project.ts
    ├── freelancer.ts
    └── client.ts
```

---

## 🎯 План действий

### Фаза 1: Очистка (немедленно)
- [ ] Удалить backup файлы:
  - `page-backup.tsx`
  - `page-old.tsx`
- [ ] Удалить пустые папки:
  - `/app/admin/`
  - `/components/deal/`
  - `/components/wallet/`

### Фаза 2: Создание shared компонентов
- [ ] Создать `/components/shared/cards/`:
  - `FreelancerCard.tsx` - универсальный компонент с пропсами для вариантов
  - `ProjectCard.tsx` - универсальный компонент
  - `EventItem.tsx` - для ленты событий
  - `QuickStatCard.tsx` - для статистики
- [ ] Создать `/components/shared/forms/`
- [ ] Создать `/components/shared/modals/`

### Фаза 3: Рефакторинг dashboard
- [ ] Переименовать `/app/dashboard/freelancer/` → `/app/dashboard/(freelancer)/overview/`
- [ ] Переименовать `/app/dashboard/client/` → `/app/dashboard/(client)/overview/`
- [ ] Переименовать `/app/dashboard/freelancers/` → `/app/dashboard/(client)/hired-freelancers/`
- [ ] Переместить `/app/dashboard/bids/` → `/app/dashboard/(freelancer)/my-bids/`
- [ ] Переместить `/app/dashboard/portfolio/` → `/app/dashboard/(freelancer)/portfolio/`
- [ ] Создать папку `/app/dashboard/(shared)/` для общих страниц

### Фаза 4: Разделение компонентов по ролям
- [ ] Создать `/components/freelancer/` для компонентов исполнителя
- [ ] Создать `/components/client/` для компонентов заказчика
- [ ] Переместить role-specific логику из `dashboard/` в эти папки

### Фаза 5: Обновление импортов
- [ ] Обновить все импорты в файлах после переименования
- [ ] Использовать новые shared компоненты вместо дублирующихся
- [ ] Проверить все страницы на работоспособность

### Фаза 6: Типизация и документация
- [ ] Создать `/types/` с интерфейсами для всех сущностей
- [ ] Добавить JSDoc комментарии к компонентам
- [ ] Создать README.md в ключевых папках

---

## 🚀 Преимущества новой структуры

1. **Понятная навигация**: Четко видно где что находится
2. **Нет дублирования**: Все компоненты в одном месте
3. **Разделение по ролям**: Freelancer/Client логика изолирована
4. **Масштабируемость**: Легко добавлять новые фичи
5. **Типобезопасность**: Общие типы в одном месте
6. **Производительность**: Нет ненужных импортов

---

## 📝 Примечания

- Route Groups `(freelancer)`, `(client)`, `(shared)` не влияют на URL
- Используем Next.js 13+ App Router conventions
- Все shared компоненты должны быть универсальными и переиспользуемыми
- Backup файлы переносим в `.archive/` вне src (на случай если понадобятся)
