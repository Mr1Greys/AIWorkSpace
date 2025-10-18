'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { useRole } from './RoleContext';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем пользователя из localStorage при монтировании
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      <UserProfileSync user={user} />
      {children}
    </AuthContext.Provider>
  );
}

// Компонент для синхронизации данных пользователя с профилями
function UserProfileSync({ user }: { user: User | null }) {
  const { freelancerProfile, clientProfile, updateFreelancerProfile, updateClientProfile } = useProfileStore();

  useEffect(() => {
    if (user) {
      // Синхронизируем базовые данные с профилями
      if (freelancerProfile && (!freelancerProfile.name || !freelancerProfile.email)) {
        updateFreelancerProfile({
          name: user.name,
          email: user.email,
          avatar: user.avatar || null,
        });
      }
      
      if (clientProfile && (!clientProfile.name || !clientProfile.email)) {
        updateClientProfile({
          name: user.name,
          email: user.email,
          avatar: user.avatar || null,
        });
      }
    }
  }, [user, freelancerProfile, clientProfile, updateFreelancerProfile, updateClientProfile]);

  return null;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
