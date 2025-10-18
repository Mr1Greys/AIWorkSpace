'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, Linkedin, MessageCircle, Mail, Lock, Wallet } from 'lucide-react';
import { Button, Input } from '@aiworkspace/ui';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Тестовые пользователи
    const testUsers = {
      'client@test.com': { 
        password: 'client123', 
        redirect: '/dashboard',
        user: { id: '1', name: 'Алекс Петров', email: 'client@test.com' }
      },
      'freelancer@test.com': { 
        password: 'freelancer123', 
        redirect: '/dashboard',
        user: { id: '2', name: 'Мария Сидорова', email: 'freelancer@test.com' }
      },
      'admin@aiworkspace.io': { 
        password: 'admin123', 
        redirect: '/admin',
        user: { id: '3', name: 'Админ', email: 'admin@aiworkspace.io' }
      },
    };

    // Проверка тестовых пользователей
    const testUser = testUsers[email as keyof typeof testUsers];
    
    if (testUser && password === testUser.password) {
      // Сохраняем пользователя в контексте
      login(testUser.user);
      
      // Успешный вход
      setTimeout(() => {
        router.push(testUser.redirect);
      }, 500);
    } else {
      // Неверные данные
      alert('Неверный email или пароль. Используйте тестовые аккаунты ниже.');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement OAuth
  };

  const handleWalletLogin = () => {
    console.log('Login with wallet');
    // TODO: Implement SIWE
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-12">
      <div className="w-full max-w-md">
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
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Войти в AIWorkSpace</h1>
            <p className="text-gray-600">Добро пожаловать! Войдите в свой аккаунт</p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-6 space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthLogin('github')}
              className="justify-start"
            >
              <Github className="h-5 w-5" />
              Войти через GitHub
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthLogin('linkedin')}
              className="justify-start"
            >
              <Linkedin className="h-5 w-5" />
              Войти через LinkedIn
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleOAuthLogin('telegram')}
              className="justify-start"
            >
              <MessageCircle className="h-5 w-5" />
              Войти через Telegram
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">или</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">Запомнить меня</span>
              </label>
              <Link href="/auth/forgot-password" className="text-primary-600 hover:text-primary-700">
                Забыли пароль?
              </Link>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          {/* Web3 Login */}
          <div className="mt-6">
            <Button
              variant="outline"
              fullWidth
              onClick={handleWalletLogin}
              className="border-2 border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100"
            >
              <Wallet className="h-5 w-5" />
              Войти через кошелёк (Web3)
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link href="/auth/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Зарегистрироваться
            </Link>
          </div>

          {/* Test Users */}
          <div className="mt-6 rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 p-4">
            <div className="mb-2 text-center text-xs font-semibold text-primary-900">
              🧪 Тестовые аккаунты для входа
            </div>
            <div className="space-y-2 text-xs text-primary-800">
              <button
                type="button"
                onClick={() => {
                  setEmail('client@test.com');
                  setPassword('client123');
                }}
                className="w-full rounded bg-white p-2 text-left transition-colors hover:bg-primary-100"
              >
                <div className="font-semibold">👨‍💼 Заказчик:</div>
                <div>Email: <code className="text-primary-600">client@test.com</code></div>
                <div>Пароль: <code className="text-primary-600">client123</code></div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('freelancer@test.com');
                  setPassword('freelancer123');
                }}
                className="w-full rounded bg-white p-2 text-left transition-colors hover:bg-primary-100"
              >
                <div className="font-semibold">👨‍💻 Фрилансер:</div>
                <div>Email: <code className="text-primary-600">freelancer@test.com</code></div>
                <div>Пароль: <code className="text-primary-600">freelancer123</code></div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@aiworkspace.io');
                  setPassword('admin123');
                }}
                className="w-full rounded bg-white p-2 text-left transition-colors hover:bg-primary-100"
              >
                <div className="font-semibold">🛡️ Админ:</div>
                <div>Email: <code className="text-primary-600">admin@aiworkspace.io</code></div>
                <div>Пароль: <code className="text-primary-600">admin123</code></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Продолжая, вы соглашаетесь с{' '}
          <Link href="/terms" className="text-gray-700 hover:text-gray-900">
            Условиями использования
          </Link>{' '}
          и{' '}
          <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
            Политикой конфиденциальности
          </Link>
        </div>
      </div>
    </div>
  );
}
