'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreateTeamModal } from '@/components/shared/modals/CreateTeamModal';
import { Users, Star, Briefcase, Plus } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';

export default function DashboardTeamsPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'invitations' | 'catalog'>('my');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const myTeams = [
    {
      id: 1,
      name: 'DeepDev Studio',
      logo: '🚀',
      members: 5,
      role: 'Backend-разработчик',
      skills: ['Next.js', 'AI', 'Node.js'],
      rating: 4.8,
    },
  ];

  const teamInvitations = [
    {
      id: 2,
      name: 'AI Wizards',
      logo: '🧙',
      members: 4,
      invitedBy: 'John Doe',
      skills: ['Python', 'TensorFlow', 'AI'],
    },
  ];

  return (
    <div className="space-y-6">
      <CreateTeamModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Команды</h1>
          <p className="mt-2 text-gray-600">Управление участием в командах</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Создать команду
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'my'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Мои команды ({myTeams.length})
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'invitations'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Приглашения ({teamInvitations.length})
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'catalog'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Каталог команд
        </button>
      </div>

      {/* My Teams */}
      {activeTab === 'my' && (
        <div className="space-y-4">
          {myTeams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{team.logo}</div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{team.name}</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Ваша роль: <span className="font-semibold">{team.role}</span>
                  </p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {team.skills.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{team.members} участников</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{team.rating}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/teams/${team.id}`}>
                  <Button variant="outline">Открыть команду</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Invitations */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          {teamInvitations.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border-2 border-primary-200 bg-primary-50 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{team.logo}</div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{team.name}</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Приглашение от: <span className="font-semibold">{team.invitedBy}</span>
                  </p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {team.skills.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{team.members} участников</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Отклонить</Button>
                  <Button>Принять</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Catalog */}
      {activeTab === 'catalog' && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Каталог команд доступен на{' '}
            <Link href="/teams" className="text-primary-600 hover:text-primary-700">
              главной странице команд
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
