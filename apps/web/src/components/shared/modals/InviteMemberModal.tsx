'use client';

import { useState } from 'react';
import { Button } from '@aiworkspace/ui';
import { X } from 'lucide-react';

export interface InviteMemberFormValues {
  email: string;
  role: string;
  message: string;
}

interface InviteMemberModalProps {
  isOpen: boolean;
  teamName: string;
  onClose: () => void;
  onInvite: (invite: InviteMemberFormValues) => void;
}

export function InviteMemberModal({ isOpen, teamName, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Участник');
  const [message, setMessage] = useState('Присоединяйтесь к нашей команде!');

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onInvite({
      email: email.trim(),
      role: role.trim(),
      message: message.trim(),
    });
    setEmail('');
    setRole('Участник');
    setMessage('Присоединяйтесь к нашей команде!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-xl font-semibold text-gray-900">Пригласить в команду</h2>
        <p className="mb-6 text-sm text-gray-600">
          Отправим приглашение в команду <span className="font-semibold text-gray-900">{teamName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="invite-email" className="mb-2 block text-sm font-medium text-gray-700">
              Email или имя пользователя
            </label>
            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="invite-role" className="mb-2 block text-sm font-medium text-gray-700">
              Роль в команде
            </label>
            <input
              id="invite-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

  <div>
            <label htmlFor="invite-message" className="mb-2 block text-sm font-medium text-gray-700">
              Сообщение
            </label>
            <textarea
              id="invite-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Отправить приглашение
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
