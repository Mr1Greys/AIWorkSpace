'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, Linkedin, MessageCircle, User, Briefcase, Sparkles } from 'lucide-react';
import { Button, Input, Badge } from '@aiworkspace/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileStore } from '@/store/profileStore';

type UserRole = 'client' | 'freelancer';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { initializeFreelancerProfile, initializeClientProfile, resetProfiles } = useProfileStore();
  
  const [role, setRole] = useState<UserRole>('freelancer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Пожалуйста, согласитесь с условиями использования');
      return;
    }

    if (password.length < 8) {
      alert('Пароль должен содержать минимум 8 символов');
      return;
    }

    setIsLoading(true);

    try {
      // Очищаем localStorage от старых данных
      localStorage.removeItem('profile-storage');
      localStorage.removeItem('auth-storage');
      
      // Сбрасываем старые профили
      resetProfiles();

      // Создаем пользователя
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: undefined,
      };

      // Инициализируем профиль в зависимости от роли
      if (role === 'freelancer') {
        initializeFreelancerProfile(name, email);
      } else {
        initializeClientProfile(name, email);
      }

      // Сохраняем роль в localStorage
      localStorage.setItem('userRole', role);

      // Логиним пользователя через AuthContext
      login(newUser);

      // Перенаправляем в личный кабинет (новая структура с route groups)
      router.push('/dashboard');
    } catch (error) {
      alert('Ошибка при регистрации. Попробуйте еще раз.');
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // TODO: Implement OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">WorkSpace</span>
          </div>
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Создать аккаунт</h1>
            <p className="text-gray-600">Присоединяйтесь к сообществу профессионалов</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-900">Выберите роль</label>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                  role === 'client'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="rounded-lg bg-white p-2">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Я ищу специалистов</div>
                  <div className="text-sm text-gray-600">Заказчик</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('freelancer')}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                  role === 'freelancer'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="rounded-lg bg-white p-2">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Я специалист</div>
                  <div className="text-sm text-gray-600">Исполнитель</div>
                </div>
              </button>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6 space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthSignup('github')}
              className="justify-start"
            >
              <Github className="h-5 w-5" />
              Продолжить с GitHub
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthSignup('linkedin')}
              className="justify-start"
            >
              <Linkedin className="h-5 w-5" />
              Продолжить с LinkedIn
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthSignup('telegram')}
              className="justify-start"
            >
              <MessageCircle className="h-5 w-5" />
              Продолжить с Telegram
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">или заполните форму</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Имя"
              placeholder="Иван Петров"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            <Input
              type="password"
              label="Пароль"
              placeholder="Минимум 8 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                💡 Остальные данные профиля вы сможете заполнить после регистрации в настройках
              </p>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300"
                required
              />
              <span className="text-sm text-gray-600">
                Я согласен с{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                  Условиями использования
                </Link>{' '}
                и{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                  Политикой конфиденциальности
                </Link>
              </span>
            </label>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link href="/auth/signin" className="font-semibold text-primary-600 hover:text-primary-700">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
