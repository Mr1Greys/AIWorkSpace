'use client';

import { useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@aiworkspace/ui';
import { TeamAvatar } from '@/components/teams/TeamAvatar';

export interface CreateTeamFormValues {
  name: string;
  description: string;
  direction: string;
  tags: string[];
  avatar?: string | null;
  avatarFile?: File | null;
}

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (team: CreateTeamFormValues) => void;
}

export function CreateTeamModal({ isOpen, onClose, onCreate }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [direction, setDirection] = useState('');
  const [tags, setTags] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateTeamFormValues = {
      name: teamName.trim(),
      description: description.trim(),
      direction,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      avatar: avatarPreview,
      avatarFile,
    };

    onCreate?.(payload);
    setTeamName('');
    setDescription('');
    setDirection('');
    setTags('');
    setAvatarPreview(null);
    setAvatarFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Создать команду</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div>
            <label htmlFor="teamName" className="mb-2 block text-sm font-medium text-gray-700">
              Название команды
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Например: AI Wizards"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о вашей команде..."
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Direction */}
          <div>
            <label htmlFor="direction" className="mb-2 block text-sm font-medium text-gray-700">
              Направление
            </label>
            <select
              id="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Выберите направление</option>
              <option value="ai">AI / Machine Learning</option>
              <option value="web">Web Development</option>
              <option value="design">Design / UI/UX</option>
              <option value="data">Data Science</option>
              <option value="web3">Web3 / Blockchain</option>
              <option value="mobile">Mobile Development</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="mb-2 block text-sm font-medium text-gray-700">
              Теги (через запятую)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, AI, Figma, Python..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Аватар команды
            </label>
            <div className="flex items-center gap-4">
              <TeamAvatar name={teamName || 'Команда'} src={avatarPreview} size="lg" />
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAvatarButtonClick}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  Загрузить
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview(null);
                      setAvatarFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-left text-xs text-gray-500 underline"
                  >
                    Удалить изображение
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelect}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Создать команду
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
