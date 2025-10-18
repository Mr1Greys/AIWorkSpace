'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Plus, X, Save, Shield, Key, Bot, Globe, Smartphone, Palette, BarChart3, LucideIcon, Building2, User, Upload, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useRole } from '@/contexts/RoleContext';
import { useProfileStore, FreelancerProfile, ClientProfile } from '@/store/profileStore';

const categories: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: 'ai', label: 'AI & ML', icon: Bot },
  { id: 'webdev', label: 'Веб-разработка', icon: Globe },
  { id: 'bots', label: 'Telegram-боты', icon: Smartphone },
  { id: 'design', label: 'Дизайн', icon: Palette },
  { id: 'data', label: 'Data/Аналитика', icon: BarChart3 },
];

const topSkills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'Figma', 'TailwindCSS', 'PostgreSQL', 'Docker'];

export default function SettingsPage() {
  const { currentRole } = useRole();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    freelancerProfile,
    clientProfile,
    updateFreelancerProfile,
    updateClientProfile,
    calculateFreelancerCompletion,
    calculateClientCompletion,
  } = useProfileStore();

  // Local state для форм
  const [freelancerForm, setFreelancerForm] = useState<Partial<FreelancerProfile>>(freelancerProfile || {});
  const [clientForm, setClientForm] = useState<Partial<ClientProfile>>(clientProfile || {});
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Обновляем локальные формы при изменении профилей из store
  useEffect(() => {
    if (freelancerProfile) setFreelancerForm(freelancerProfile);
  }, [freelancerProfile]);

  useEffect(() => {
    if (clientProfile) setClientForm(clientProfile);
  }, [clientProfile]);

  const completion = currentRole === 'freelancer' 
    ? calculateFreelancerCompletion() 
    : calculateClientCompletion();

  // Загрузка аватара
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const avatar = reader.result as string;
        if (currentRole === 'freelancer') {
          setFreelancerForm({ ...freelancerForm, avatar });
        } else {
          setClientForm({ ...clientForm, avatar });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Добавление навыка
  const addSkill = (skill: string) => {
    if (!freelancerForm || !freelancerForm.skills) return;
    if (skill && !freelancerForm.skills.includes(skill) && freelancerForm.skills.length < 10) {
      setFreelancerForm({
        ...freelancerForm,
        skills: [...freelancerForm.skills, skill],
      });
      setNewSkill('');
    }
  };

  // Удаление навыка
  const removeSkill = (skill: string) => {
    if (!freelancerForm || !freelancerForm.skills) return;
    setFreelancerForm({
      ...freelancerForm,
      skills: freelancerForm.skills.filter((s) => s !== skill),
    });
  };

  // Переключение категории
  const toggleCategory = (categoryId: string) => {
    if (!freelancerForm || !freelancerForm.categories) return;
    if (freelancerForm.categories.includes(categoryId)) {
      setFreelancerForm({
        ...freelancerForm,
        categories: freelancerForm.categories.filter((c) => c !== categoryId),
      });
    } else if (freelancerForm.categories.length < 3) {
      setFreelancerForm({
        ...freelancerForm,
        categories: [...freelancerForm.categories, categoryId],
      });
    }
  };

  // Сохранение профиля
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Валидация
      if (currentRole === 'freelancer') {
        if (!freelancerForm.name || !freelancerForm.email) {
          alert('Заполните обязательные поля: Имя и Email');
          setIsSaving(false);
          return;
        }
        
        // Валидация Telegram (без @)
        if (freelancerForm.telegram && freelancerForm.telegram.startsWith('@')) {
          alert('Telegram username указывается без символа @');
          setIsSaving(false);
          return;
        }
        
        // Валидация Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(freelancerForm.email)) {
          alert('Введите корректный email');
          setIsSaving(false);
          return;
        }

        updateFreelancerProfile(freelancerForm as Partial<FreelancerProfile>);
      } else {
        if (!clientForm.name || !clientForm.email) {
          alert('Заполните обязательные поля: Имя и Email');
          setIsSaving(false);
          return;
        }
        
        // Валидация Telegram (без @)
        if (clientForm.telegram && clientForm.telegram.startsWith('@')) {
          alert('Telegram username указывается без символа @');
          setIsSaving(false);
          return;
        }
        
        // Валидация Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientForm.email)) {
          alert('Введите корректный email');
          setIsSaving(false);
          return;
        }

        updateClientProfile(clientForm as Partial<ClientProfile>);
      }

      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      alert('Профиль успешно сохранен!');
    } catch (error) {
      alert('Ошибка при сохранении профиля');
    } finally {
      setIsSaving(false);
    }
  };

  const currentForm = currentRole === 'freelancer' ? freelancerForm : clientForm;
  const currentAvatar = currentForm?.avatar;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">⚙️ Настройки профиля</h1>
        <p className="mt-2 text-gray-600">
          Управление профилем {currentRole === 'freelancer' ? 'исполнителя' : 'заказчика'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Прогресс заполнения профиля</h3>
          <span className="text-2xl font-bold text-primary-600">{completion}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {completion === 100 ? (
            <span className="text-green-600">✅ Профиль полностью заполнен</span>
          ) : (
            `Заполните профиль на 100% для лучшей видимости`
          )}
        </p>
      </div>

      {/* Main Form */}
      <div className="space-y-6">
        {/* Avatar & Basic Info */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Основная информация</h2>

          {/* Avatar Upload */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900">Фото профиля</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-3xl font-bold text-white">
                    {currentForm.name ? currentForm.name.substring(0, 2).toUpperCase() : 'АП'}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Загрузите фото</p>
                <p className="text-xs text-gray-500">JPG, PNG или GIF, до 2MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Имя и фамилия *
            </label>
            <input
              type="text"
              value={currentForm.name || ''}
              onChange={(e) =>
                currentRole === 'freelancer'
                  ? setFreelancerForm({ ...freelancerForm, name: e.target.value })
                  : setClientForm({ ...clientForm, name: e.target.value })
              }
              placeholder="Иван Петров"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-900">Email *</label>
            <input
              type="email"
              value={currentForm.email || ''}
              onChange={(e) =>
                currentRole === 'freelancer'
                  ? setFreelancerForm({ ...freelancerForm, email: e.target.value })
                  : setClientForm({ ...clientForm, email: e.target.value })
              }
              placeholder="ivan@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Telegram */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-900">Telegram</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">@</span>
              <input
                type="text"
                value={currentForm.telegram || ''}
                onChange={(e) =>
                  currentRole === 'freelancer'
                    ? setFreelancerForm({ ...freelancerForm, telegram: e.target.value })
                    : setClientForm({ ...clientForm, telegram: e.target.value })
                }
                placeholder="username"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-900">Город</label>
            <input
              type="text"
              value={currentForm.city || ''}
              onChange={(e) =>
                currentRole === 'freelancer'
                  ? setFreelancerForm({ ...freelancerForm, city: e.target.value })
                  : setClientForm({ ...clientForm, city: e.target.value })
              }
              placeholder="Москва"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Freelancer-specific fields */}
        {currentRole === 'freelancer' && (
          <>
            {/* Professional Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Профессиональная информация
              </h2>

              {/* Headline */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Заголовок профиля
                </label>
                <input
                  type="text"
                  value={freelancerForm.headline || ''}
                  onChange={(e) =>
                    setFreelancerForm({ ...freelancerForm, headline: e.target.value })
                  }
                  placeholder="Full-stack разработчик и AI-инженер"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900">О себе</label>
                <textarea
                  value={freelancerForm.bio || ''}
                  onChange={(e) => setFreelancerForm({ ...freelancerForm, bio: e.target.value })}
                  placeholder="Расскажите, чем вы занимаетесь и что умеете..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Experience */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Опыт работы (лет)
                </label>
                <input
                  type="number"
                  value={freelancerForm.experience || 0}
                  onChange={(e) =>
                    setFreelancerForm({ ...freelancerForm, experience: parseInt(e.target.value) || 0 })
                  }
                  min="0"
                  max="50"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Hourly Rate */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Ставка в час ($)
                </label>
                <input
                  type="number"
                  value={freelancerForm.hourlyRate || 0}
                  onChange={(e) =>
                    setFreelancerForm({ ...freelancerForm, hourlyRate: parseInt(e.target.value) || 0 })
                  }
                  min="0"
                  placeholder="50"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Направления (до 3)
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = freelancerForm.categories?.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span className={`font-medium ${isSelected ? 'text-primary-900' : 'text-gray-700'}`}>
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Навыки (до 10)</h2>

              {/* Selected Skills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {freelancerForm.skills?.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1.5 text-sm font-medium text-white"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="rounded-full transition-colors hover:bg-white/20"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Popular Skills */}
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-gray-700">Популярные навыки:</p>
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      disabled={freelancerForm.skills?.includes(skill) || (freelancerForm.skills?.length || 0) >= 10}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                  placeholder="Добавить свой навык"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={(freelancerForm.skills?.length || 0) >= 10}
                />
                <button
                  onClick={() => addSkill(newSkill)}
                  disabled={!newSkill || (freelancerForm.skills?.length || 0) >= 10}
                  className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  Добавить
                </button>
              </div>
            </div>
          </>
        )}

        {/* Client-specific fields */}
        {currentRole === 'client' && (
          <>
            {/* Client Type Selector */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Тип заказчика</h2>
              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setClientForm({ ...clientForm, clientType: 'individual' })}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    clientForm.clientType === 'individual'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <User className={`h-6 w-6 ${clientForm.clientType === 'individual' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${clientForm.clientType === 'individual' ? 'text-primary-900' : 'text-gray-700'}`}>
                    Физическое лицо
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setClientForm({ ...clientForm, clientType: 'company' })}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    clientForm.clientType === 'company'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Building2 className={`h-6 w-6 ${clientForm.clientType === 'company' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${clientForm.clientType === 'company' ? 'text-primary-900' : 'text-gray-700'}`}>
                    Компания
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setClientForm({ ...clientForm, clientType: 'entrepreneur' })}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    clientForm.clientType === 'entrepreneur'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Briefcase className={`h-6 w-6 ${clientForm.clientType === 'entrepreneur' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${clientForm.clientType === 'entrepreneur' ? 'text-primary-900' : 'text-gray-700'}`}>
                    ИП
                  </span>
                </button>
              </div>
            </div>

            {/* Company/Entrepreneur Info */}
            {(clientForm.clientType === 'company' || clientForm.clientType === 'entrepreneur') && (
              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  {clientForm.clientType === 'company' ? 'Информация о компании' : 'Информация об ИП'}
                </h2>

                {/* Company Name */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    {clientForm.clientType === 'company' ? 'Название компании' : 'Название ИП'}
                  </label>
                  <input
                    type="text"
                    value={clientForm.companyName || ''}
                    onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                    placeholder={clientForm.clientType === 'company' ? "ООО 'Технологии'" : "ИП Иванов И.И."}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

            {/* Company Website */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-900">Сайт компании</label>
              <input
                type="url"
                value={clientForm.companyWebsite || ''}
                onChange={(e) => setClientForm({ ...clientForm, companyWebsite: e.target.value })}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Industry */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-900">Отрасль</label>
              <input
                type="text"
                value={clientForm.industry || ''}
                onChange={(e) => setClientForm({ ...clientForm, industry: e.target.value })}
                placeholder="IT, Финансы, E-commerce..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                {clientForm.clientType === 'company' ? 'О компании' : 'О себе'}
              </label>
              <textarea
                value={clientForm.bio || ''}
                onChange={(e) => setClientForm({ ...clientForm, bio: e.target.value })}
                placeholder={clientForm.clientType === 'company' ? 'Расскажите о вашей компании...' : 'Расскажите о себе...'}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
              </div>
            )}
          </>
        )}

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Отмена
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </div>
  );
}
