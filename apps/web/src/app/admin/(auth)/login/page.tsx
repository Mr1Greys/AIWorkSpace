'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const formInitial = { email: '', password: '' };

function AdminLoginInner() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [form, setForm] = useState(formInitial);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const success = await login(form.email, form.password);
    if (!success) {
      setError('Неверный логин или пароль администратора.');
      setSubmitting(false);
      return;
    }
    router.replace('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent" />
          <p className="text-gray-600">Проверяем доступ…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EEF2FF] via-white to-[#F5F5FF] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-10 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] text-lg font-bold text-white">
            AI
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Вход в админ-панель</h1>
          <p className="text-sm text-gray-500">
            Используйте корпоративные учётные данные, чтобы управлять платформой.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              placeholder="admin@aiworkspace.io"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Выполняем вход…' : 'Войти в панель'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Доступ предоставляется только сотрудникам AIWorkSpace. Все действия отслеживаются.
        </p>
      </div>
    </div>
  );
}

export default AdminLoginInner;
