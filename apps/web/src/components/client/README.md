# 💼 Client Components

Компоненты, специфичные только для заказчиков.

## 📁 Структура

```
client/
├── HiredFreelancers.tsx    # Список нанятых исполнителей
├── ProjectApplicants.tsx   # Список откликов на проект
├── ClientStats.tsx         # Статистика для dashboard
└── ProjectsList.tsx        # Список проектов (будет создан)
```

## 🎯 Использование

Эти компоненты используются только на страницах заказчика:
- `/dashboard/(client)/overview`
- `/dashboard/(client)/my-projects`
- `/dashboard/(client)/hired-freelancers`

## 📝 Примечание

Для общих компонентов используйте `/components/shared/`
