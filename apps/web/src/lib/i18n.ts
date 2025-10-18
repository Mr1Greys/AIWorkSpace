export const translations = {
  ru: {
    common: {
      getStarted: 'Начать работу',
      browseProjects: 'Просмотр проектов',
      signIn: 'Войти',
      signUp: 'Регистрация',
      search: 'Поиск',
      filter: 'Фильтр',
      apply: 'Откликнуться',
      viewDetails: 'Подробнее',
      message: 'Написать',
      viewProfile: 'Смотреть профиль',
      back: 'Назад',
      next: 'Далее',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      create: 'Создать',
      loading: 'Загрузка...',
    },
    nav: {
      projects: 'Проекты',
      dashboard: 'Панель управления',
      createBrief: 'Создать бриф',
      freelancers: 'Фрилансеры',
      teams: 'Команды',
      profile: 'Профиль',
    },
    home: {
      badge: 'Web2.5 платформа для IT и AI фрилансеров',
      title: 'Найдите идеальных исполнителей с',
      titleHighlight: 'AI-точностью',
      subtitle: 'Соединяем специалистов и компании без токсичных комиссий. Интеллектуальный подбор, безопасные эскроу-платежи и современный дизайн.',
      whyTitle: 'Почему AIWorkSpace?',
      whySubtitle: 'Современные инструменты для современных профессионалов',
      features: {
        aiMatching: {
          title: 'AI-матчинг',
          description: 'Интеллектуальный подбор фрилансеров на основе навыков, рейтингов и требований проекта',
        },
        web3Escrow: {
          title: 'Web3 Эскроу',
          description: 'Прозрачные платежи через USDC на Base L2 с автоматическим высвобождением средств',
        },
        realTimeChat: {
          title: 'Чат в реальном времени',
          description: 'WebSocket коммуникация с индикаторами набора текста и мгновенными уведомлениями',
        },
        portfolioCases: {
          title: 'Портфолио-кейсы',
          description: 'Структурированные карточки портфолио с AI-помощником для легкой демонстрации работ',
        },
      },
      ctaTitle: 'Готовы начать свой следующий проект?',
      ctaSubtitle: 'Присоединяйтесь к тысячам профессионалов, уже использующих AIWorkSpace',
      ctaButton: 'Зарегистрироваться',
    },
    brief: {
      title: 'Создание брифа',
      steps: {
        goal: {
          title: 'Цель и описание',
          subtitle: 'Что вам нужно?',
          whatNeed: 'Что вам нужно?',
          describeProject: 'Опишите ваш проект подробно',
          projectTitle: 'Название проекта',
          projectTitlePlaceholder: 'Например, Telegram бот с интеграцией платежей',
          description: 'Описание',
          descriptionPlaceholder: 'Опишите, что вам нужно подробно...',
          aiSuggestions: 'AI-подсказки',
          aiSuggestionsText: 'Рекомендуем добавить: дедлайн, диапазон бюджета, требуемый уровень опыта',
        },
        tags: {
          title: 'Теги и стек',
          description: 'Технологии и навыки',
          suggestedTags: 'Предложенные теги (нажмите для выбора)',
          selectedTags: 'Выбранные теги',
          noTags: 'Теги еще не выбраны',
        },
        budget: {
          title: 'Бюджет и дедлайн',
          description: 'Установите бюджет и сроки',
          budgetRange: 'Диапазон бюджета',
          minimum: 'Минимум ($)',
          maximum: 'Максимум ($)',
          deadline: 'Дедлайн',
          projectType: 'Тип проекта',
          types: {
            bounty: {
              title: 'Баунти',
              description: 'Фиксированная награда за выполнение',
            },
            custom: {
              title: 'Кастом',
              description: 'Гибкое сотрудничество',
            },
            contest: {
              title: 'Конкурс',
              description: 'Множественные предложения',
            },
          },
        },
        preview: {
          title: 'Предпросмотр брифа',
          description: 'Проверьте перед публикацией',
          untitled: 'Без названия',
          noDescription: 'Нет описания',
          noDeadline: 'Без дедлайна',
          readyTitle: 'Готово к поиску совпадений!',
          readyText: 'Наш AI подберет вам 5-10 квалифицированных специалистов',
        },
      },
      createBrief: 'Создать бриф',
    },
    projects: {
      title: 'Обзор проектов',
      subtitle: 'Найдите свою следующую возможность из {count} активных проектов',
      searchPlaceholder: 'Поиск проектов...',
      client: 'Заказчик',
      tags: {
        ai: 'AI',
        web3: 'Web3',
        backend: 'Backend',
        frontend: 'Frontend',
        mobile: 'Мобильные',
        design: 'Дизайн',
      },
    },
    freelancers: {
      title: 'Найти фрилансеров',
      subtitle: 'Просмотрите {count} талантливых профессионалов',
      searchPlaceholder: 'Поиск по навыкам, имени или локации...',
      available: 'Доступен',
      busy: 'Занят',
    },
    dashboard: {
      welcome: 'С возвращением, {name} 👋',
      subtitle: 'Вот что происходит с вашими проектами сегодня',
      stats: {
        activeProjects: 'Активные проекты',
        balance: 'Баланс (USDC)',
        averageRating: 'Средний рейтинг',
        proposals: 'Предложения',
        thisWeek: '+{count} на этой неделе',
        thisMonth: '+${amount} в этом месяце',
        fromReviews: 'Из {count} отзывов',
        pendingResponse: '{count} ожидают ответа',
      },
      nextSteps: {
        title: 'Следующие шаги',
        completeProfile: {
          title: 'Завершите свой профиль',
          description: 'Добавьте больше деталей для увеличения процента совпадений',
          action: 'Завершить профиль',
        },
        addCase: {
          title: 'Добавьте новый кейс',
          description: 'Покажите свою последнюю работу',
          action: 'Добавить кейс',
        },
      },
      recentActivity: {
        title: 'Недавняя активность',
        payment: {
          title: 'Платеж получен',
          description: '${amount} от {name} за "{project}"',
        },
        message: {
          title: 'Новое сообщение',
          description: '{name} ответил на ваше предложение',
        },
        project: {
          title: 'Проект завершен',
          description: '"{project}" отмечен как завершенный',
        },
        timeAgo: {
          hoursAgo: '{count} ч. назад',
          daysAgo: '{count} д. назад',
          minutesAgo: '{count} мин. назад',
        },
      },
    },
    chat: {
      messages: 'Сообщения',
      typePlaceholder: 'Введите сообщение...',
      createEscrow: 'Создать эскроу',
      openDispute: 'Открыть спор',
      dealStatus: {
        title: 'Статус сделки',
        status: 'Статус',
        amount: 'Сумма',
        deadline: 'Дедлайн',
        viewFullDeal: 'Посмотреть полную сделку',
        inEscrow: 'В эскроу',
        onBase: 'USDC на Base',
      },
      projectDetails: {
        title: 'Детали проекта',
        type: 'Тип',
        started: 'Начато',
        duration: 'Длительность',
        custom: 'Кастом',
        days: '{count} дней',
      },
    },
    footer: {
      description: 'Современная платформа для IT и AI фрилансеров с AI-подбором',
      product: 'Продукт',
      company: 'Компания',
      connect: 'Связаться',
      links: {
        browseProjects: 'Обзор проектов',
        createBrief: 'Создать бриф',
        pricing: 'Тарифы',
        about: 'О нас',
        helpCenter: 'Центр помощи',
        privacy: 'Политика конфиденциальности',
      },
      copyright: '© 2025 AIWorkSpace. Все права защищены.',
    },
    pricing: {
      badge: 'Прозрачные тарифы без скрытых платежей',
      title: 'Тарифы AIWorkSpace',
      subtitle: 'Выберите удобный формат работы — начинайте бесплатно, развивайтесь профессионально',
      comparison: 'Сравнение тарифов',
      benefits: {
        title: 'Почему пользователи выбирают Pro',
        subtitle: 'Получите больше возможностей для роста и развития',
      },
      payment: {
        title: 'Удобные способы оплаты',
      },
      faq: {
        title: 'Частые вопросы',
      },
      cta: {
        title: 'Откройте больше возможностей с AIWorkSpace Pro',
        subtitle: 'Создавайте, развивайтесь, зарабатывайте без ограничений',
        button: 'Перейти на Pro',
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.ru;

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations.ru;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  if (!params) {
    return value;
  }
  
  return value.replace(/\{(\w+)\}/g, (_, key) => String(params[key] || ''));
}
