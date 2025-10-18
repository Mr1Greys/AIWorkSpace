'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Menu, LogOut } from 'lucide-react';
import { RoleToggle } from '@/components/dashboard/RoleToggle';
import { BalanceDropdown } from '@/components/dashboard/BalanceDropdown';
import { RoleContext } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const roleContext = useContext(RoleContext);
  const currentRole = roleContext?.currentRole || 'freelancer';
  const setCurrentRole = roleContext?.setCurrentRole || (() => {});
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
              <span className="text-lg font-bold text-white">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WorkSpace</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {currentRole === 'client' ? (
              <>
                <Link href="/freelancers" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Специалисты
                </Link>
                <Link href="/teams" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Команды
                </Link>
              </>
            ) : (
              <>
                <Link href="/projects" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Проекты
                </Link>
                <Link href="/teams" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Команды
                </Link>
              </>
            )}
          </nav>

          {/* Role Toggle - Center (только для авторизованных) */}
          {isAuthenticated && (
            <div className="hidden md:block">
              <RoleToggle currentRole={currentRole} onRoleChange={setCurrentRole} />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Balance */}
                <BalanceDropdown balance={2450} />

                {/* Notifications */}
                <button className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* Profile */}
                <Link
                  href="/dashboard/settings"
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  title={user?.name || 'Профиль'}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <span>{user?.name ? user.name.substring(0, 2).toUpperCase() : 'АП'}</span>
                  )}
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                  title="Выйти"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href="/auth/signin"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Войти
                </Link>

                {/* Sign Up */}
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg"
                >
                  Зарегистрироваться
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
