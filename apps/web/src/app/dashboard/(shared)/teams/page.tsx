'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CreateTeamModal, CreateTeamFormValues } from '@/components/shared/modals/CreateTeamModal';
import { InviteMemberModal, InviteMemberFormValues } from '@/components/shared/modals/InviteMemberModal';
import { Users, Star, Briefcase, Plus, Mail } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';
import { TeamAvatar } from '@/components/teams/TeamAvatar';

type DashboardTeam = {
  id: number;
  name: string;
  avatar?: string | null;
  members: number;
  role: string;
  skills: string[];
  rating: number;
  description: string;
};

type IncomingInvitation = {
  id: number;
  teamId: number;
  teamName: string;
  avatar?: string | null;
  members: number;
  invitedBy: string;
  skills: string[];
  status: 'pending' | 'accepted' | 'declined';
};

type OutgoingInvitation = {
  id: number;
  teamId: number;
  teamName: string;
  avatar?: string | null;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined';
};

export default function DashboardTeamsPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'invitations' | 'catalog'>('my');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [teamForInvite, setTeamForInvite] = useState<DashboardTeam | null>(null);

  const [myTeams, setMyTeams] = useState<DashboardTeam[]>([
    {
      id: 1,
      name: 'DeepDev Studio',
      avatar: null,
      members: 5,
      role: 'Backend-разработчик',
      skills: ['Next.js', 'AI', 'Node.js'],
      rating: 4.8,
      description: 'Команда разработчиков, специализирующаяся на сложных веб-проектах',
    },
  ]);

  const [incomingInvitations, setIncomingInvitations] = useState<IncomingInvitation[]>([
    {
      id: 2,
      teamId: 2,
      teamName: 'AI Wizards',
      avatar: null,
      members: 4,
      invitedBy: 'John Doe',
      skills: ['Python', 'TensorFlow', 'AI'],
      status: 'pending',
    },
  ]);

  const [outgoingInvites, setOutgoingInvites] = useState<OutgoingInvitation[]>([]);

  const handleCreateTeam = (values: CreateTeamFormValues) => {
    const newTeam: DashboardTeam = {
      id: Date.now(),
      name: values.name,
      avatar: values.avatar || null,
      members: 1,
      role: 'Владелец',
      skills: values.tags.slice(0, 4),
      rating: 5,
      description: values.description,
    };

    setMyTeams((prev) => [...prev, newTeam]);
    setActiveTab('my');
  };

  const handleInviteMember = (team: DashboardTeam, invite: InviteMemberFormValues) => {
    const inviteEntry: OutgoingInvitation = {
      id: Date.now(),
      teamId: team.id,
      teamName: team.name,
      avatar: team.avatar,
      email: invite.email,
      role: invite.role,
      status: 'pending',
    };

    setOutgoingInvites((prev) => [inviteEntry, ...prev]);
  };

  const handleAcceptInvitation = (inviteId: number) => {
    setIncomingInvitations((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: 'accepted' } : invite
      )
    );
  };

  const handleDeclineInvitation = (inviteId: number) => {
    setIncomingInvitations((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: 'declined' } : invite
      )
    );
  };

  const pendingIncoming = useMemo(
    () => incomingInvitations.filter((invite) => invite.status === 'pending'),
    [incomingInvitations]
  );

  const displayedIncoming = useMemo(() => incomingInvitations, [incomingInvitations]);

  return (
    <div className="space-y-6">
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTeam}
      />
      <InviteMemberModal
        isOpen={!!teamForInvite}
        teamName={teamForInvite?.name || ''}
        onClose={() => setTeamForInvite(null)}
        onInvite={(invite) => {
          if (teamForInvite) {
            handleInviteMember(teamForInvite, invite);
          }
        }}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Команды</h1>
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
          Приглашения ({pendingIncoming.length + outgoingInvites.length})
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
                <TeamAvatar name={team.name} src={team.avatar} size="lg" />
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
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => setTeamForInvite(team)}>
                    <Mail className="h-4 w-4" />
                    Пригласить
                  </Button>
                  <Link href={`/teams/${team.id}`}>
                    <Button variant="ghost">Открыть команду</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Invitations */}
      {activeTab === 'invitations' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Входящие приглашения</h2>
            {displayedIncoming.length === 0 && (
              <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                Пока нет приглашений. Как только кто-то пригласит вас, они появятся здесь.
              </p>
            )}
            {displayedIncoming.map((invite) => (
              <div
                key={invite.id}
                className="rounded-2xl border-2 border-primary-200 bg-primary-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <TeamAvatar name={invite.teamName} src={invite.avatar} size="md" />
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{invite.teamName}</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Приглашение от: <span className="font-semibold">{invite.invitedBy}</span>
                    </p>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {invite.skills.map((skill) => (
                        <Badge key={skill} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{invite.members} участников</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      disabled={invite.status !== 'pending'}
                      onClick={() => handleDeclineInvitation(invite.id)}
                    >
                      {invite.status === 'declined' ? 'Отклонено' : 'Отклонить'}
                    </Button>
                    <Button
                      disabled={invite.status !== 'pending'}
                      onClick={() => handleAcceptInvitation(invite.id)}
                    >
                      {invite.status === 'accepted' ? 'Принято' : 'Принять'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Отправленные приглашения</h2>
            {outgoingInvites.length === 0 && (
              <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                Вы ещё не приглашали участников. Откройте свою команду и нажмите «Пригласить».
              </p>
            )}
            {outgoingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <TeamAvatar name={invite.teamName} src={invite.avatar} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {invite.email}
                      <span className="ml-2 text-xs text-gray-500">({invite.role})</span>
                    </p>
                    <p className="text-xs text-gray-500">Команда: {invite.teamName}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    invite.status === 'pending'
                      ? 'text-amber-500'
                      : invite.status === 'accepted'
                      ? 'text-emerald-600'
                      : 'text-rose-500'
                  }`}
                >
                  {invite.status === 'pending'
                    ? 'Ожидает ответа'
                    : invite.status === 'accepted'
                    ? 'Принято'
                    : 'Отклонено'}
                </span>
              </div>
            ))}
          </div>
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
