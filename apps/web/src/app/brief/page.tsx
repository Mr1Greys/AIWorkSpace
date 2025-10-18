'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, ArrowLeft, Sparkles, DollarSign, Calendar } from 'lucide-react';

type Step = 'goal' | 'tags' | 'budget' | 'preview';

export default function BriefPage() {
  const [currentStep, setCurrentStep] = useState<Step>('goal');
  const [briefData, setBriefData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    budget: { min: 500, max: 5000 },
    deadline: '',
    projectType: 'custom' as 'bounty' | 'custom' | 'contest',
  });

  const steps: { id: Step; title: string; description: string }[] = [
    { id: 'goal', title: 'Цель и описание', description: 'Что вам нужно?' },
    { id: 'tags', title: 'Теги и стек', description: 'Технологии и навыки' },
    { id: 'budget', title: 'Бюджет и срок', description: 'Время и деньги' },
    { id: 'preview', title: 'Предпросмотр', description: 'Проверьте бриф' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        index <= currentStepIndex
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-900">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-1 flex-1 ${
                        index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            {currentStep === 'goal' && (
              <GoalStep briefData={briefData} setBriefData={setBriefData} />
            )}
            {currentStep === 'tags' && (
              <TagsStep briefData={briefData} setBriefData={setBriefData} />
            )}
            {currentStep === 'budget' && (
              <BudgetStep briefData={briefData} setBriefData={setBriefData} />
            )}
            {currentStep === 'preview' && <PreviewStep briefData={briefData} />}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </button>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                {currentStepIndex === steps.length - 1 ? 'Создать бриф' : 'Далее'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function GoalStep({
  briefData,
  setBriefData,
}: {
  briefData: any;
  setBriefData: (data: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Что вам нужно?</h2>
        <p className="text-gray-600">Опишите ваш проект подробно</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">Название проекта</label>
        <input
          type="text"
          value={briefData.title}
          onChange={(e) => setBriefData({ ...briefData, title: e.target.value })}
          placeholder="Например: Telegram бот с интеграцией платежей"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">Описание</label>
        <textarea
          value={briefData.description}
          onChange={(e) => setBriefData({ ...briefData, description: e.target.value })}
          placeholder="Опишите подробно, что вам нужно..."
          rows={6}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="rounded-lg bg-primary-50 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <div>
            <h3 className="font-medium text-primary-900">Подсказки AI</h3>
            <p className="mt-1 text-sm text-primary-700">
              Рекомендуем добавить: срок, диапазон бюджета, требуемый уровень опыта
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagsStep({
  briefData,
  setBriefData,
}: {
  briefData: any;
  setBriefData: (data: any) => void;
}) {
  const suggestedTags = [
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'AI/ML',
    'Web3',
    'TypeScript',
    'Tailwind',
  ];

  const toggleTag = (tag: string) => {
    setBriefData({
      ...briefData,
      tags: briefData.tags.includes(tag)
        ? briefData.tags.filter((t: string) => t !== tag)
        : [...briefData.tags, tag],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Теги и стек</h2>
        <p className="text-gray-600">Выберите требуемые технологии и навыки</p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-900">
          Рекомендуемые теги (нажмите для выбора)
        </label>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                briefData.tags.includes(tag)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">Выбранные теги</label>
        <div className="flex flex-wrap gap-2">
          {briefData.tags.length === 0 ? (
            <p className="text-sm text-gray-500">Теги еще не выбраны</p>
          ) : (
            briefData.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-lg bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
              >
                #{tag}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BudgetStep({
  briefData,
  setBriefData,
}: {
  briefData: any;
  setBriefData: (data: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Бюджет и срок</h2>
        <p className="text-gray-600">Установите диапазон бюджета и сроки</p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-900">Диапазон бюджета</label>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs text-gray-600">Минимум ($)</label>
            <input
              type="number"
              value={briefData.budget.min}
              onChange={(e) =>
                setBriefData({
                  ...briefData,
                  budget: { ...briefData.budget, min: parseInt(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs text-gray-600">Максимум ($)</label>
            <input
              type="number"
              value={briefData.budget.max}
              onChange={(e) =>
                setBriefData({
                  ...briefData,
                  budget: { ...briefData.budget, max: parseInt(e.target.value) },
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">Срок выполнения</label>
        <input
          type="date"
          value={briefData.deadline}
          onChange={(e) => setBriefData({ ...briefData, deadline: e.target.value })}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-900">Тип проекта</label>
        <div className="grid gap-4 md:grid-cols-3">
          {(['bounty', 'custom', 'contest'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setBriefData({ ...briefData, projectType: type })}
              className={`rounded-lg border-2 p-4 text-left transition-colors ${
                briefData.projectType === type
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">
                {type === 'bounty' && 'Баунти'}
                {type === 'custom' && 'Кастомный'}
                {type === 'contest' && 'Конкурс'}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {type === 'bounty' && 'Фиксированная награда за выполнение'}
                {type === 'custom' && 'Гибкое сотрудничество'}
                {type === 'contest' && 'Множественные заявки'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewStep({ briefData }: { briefData: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Предпросмотр брифа</h2>
        <p className="text-gray-600">Проверьте перед публикацией</p>
      </div>

      <div className="space-y-4 rounded-lg bg-gray-50 p-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{briefData.title || 'Без названия'}</h3>
          <p className="mt-2 text-gray-600">{briefData.description || 'Нет описания'}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {briefData.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              ${briefData.budget.min} - ${briefData.budget.max}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{briefData.deadline || 'Без срока'}</span>
          </div>
          <div>
            {briefData.projectType === 'bounty' && 'Баунти'}
            {briefData.projectType === 'custom' && 'Кастомный'}
            {briefData.projectType === 'contest' && 'Конкурс'}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-green-50 p-4">
        <h3 className="font-medium text-green-900">Готовы найти исполнителей!</h3>
        <p className="mt-1 text-sm text-green-700">
          Наш AI подберет вам 5-10 квалифицированных специалистов
        </p>
      </div>
    </div>
  );
}
