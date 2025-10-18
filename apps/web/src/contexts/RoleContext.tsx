'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'freelancer' | 'client';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isReady: boolean;
}

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('client');
  const [isReady, setIsReady] = useState(false);

  // Инициализация из localStorage после гидрации
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    if (savedRole === 'client' || savedRole === 'freelancer') {
      setCurrentRole(savedRole);
    }
    setIsReady(true);
  }, []);

  // Сохранение роли в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined' && isReady) {
      localStorage.setItem('userRole', currentRole);
    }
  }, [currentRole, isReady]);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, isReady }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
