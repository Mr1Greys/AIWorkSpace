'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Clock, Plus, X } from 'lucide-react';
import { Button } from '@aiworkspace/ui';
import { useProjectStore } from '@/store/projectStore';
import { useRole } from '@/contexts/RoleContext';

export default function NewProjectPage() {
  const router = useRouter();
  const { currentRole } = useRole();
  const addProject = useProjectStore((state) => state.addProject);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    tags: [] as string[],
    requirements: [''] as string[],
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag] });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Добавляем проект в store
    addProject({
      title: formData.title,
      description: formData.description,
      budgetMin: Number(formData.budgetMin),
      budgetMax: Number(formData.budgetMax),
      deadline: formData.deadline,
      tags: formData.tags,
      requirements: formData.requirements.filter(r => r.trim() !== ''),
      clientId: 'client-1', // TODO: Получать из контекста авторизации
      clientName: 'Алекс', // TODO: Получать из контекста авторизации
    });
    
    // Небольшая задержка для сохранения в localStorage
    setTimeout(() => {
      // Перенаправляем на список проектов
      router.push('/dashboard/my-projects');
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-2">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Создать проект</h1>
        </div>
        <p className="mt-2 text-gray-600">Опишите ваш проект и найдите подходящего исполнителя</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Название проекта */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Название проекта *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Например: Разработка мобильного приложения"
            className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
          />
        </div>

        {/* Описание */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Описание проекта *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Подробно опишите задачу, ключевые функции и ожидаемый результат..."
            rows={8}
            className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
          />
        </div>

        {/* Бюджет */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Бюджет *
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[13px] text-[#6B7280]">От (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="number"
                  required
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                  placeholder="1000"
                  className="w-full rounded-[10px] border border-[#E5E7EB] bg-white py-3 pl-10 pr-4 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[13px] text-[#6B7280]">До (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="number"
                  required
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                  placeholder="2000"
                  className="w-full rounded-[10px] border border-[#E5E7EB] bg-white py-3 pl-10 pr-4 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Срок */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Срок выполнения *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              placeholder="Например: 14 дней"
              className="w-full rounded-[10px] border border-[#E5E7EB] bg-white py-3 pl-10 pr-4 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
            />
          </div>
        </div>

        {/* Теги */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Навыки и технологии
          </label>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Добавьте тег (например: React)"
              className="flex-1 rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-2 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="rounded-[10px] bg-[#3B82F6] px-4 py-2 text-white hover:bg-[#2563EB]"
            >
              Добавить
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-[13px] font-medium text-[#374151]"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-[#9CA3AF] hover:text-[#EF4444]"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Требования */}
        <div className="rounded-[10px] border border-[#F3F4F6] bg-white p-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#1F2937]">
            Требования к исполнителю
          </label>
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  placeholder="Например: Минимум 3 года опыта"
                  className="flex-1 rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-2 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="rounded-[10px] border border-[#E5E7EB] px-3 text-[#EF4444] hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddRequirement}
            className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#3B82F6] hover:text-[#2563EB]"
          >
            <Plus className="h-4 w-4" />
            Добавить требование
          </button>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:shadow-lg"
          >
            Опубликовать проект
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-[10px] border border-[#E5E7EB] bg-white px-6 py-3 text-[14px] font-medium text-[#374151] transition-all duration-200 hover:bg-[#F3F4F6]"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
