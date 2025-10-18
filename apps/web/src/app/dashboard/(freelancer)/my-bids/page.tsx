'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, DollarSign, Eye, X, Check } from 'lucide-react';
import { Badge, Button } from '@aiworkspace/ui';

export default function BidsPage() {
  const [activeTab, setActiveTab] = useState<'bids' | 'invitations'>('bids');

  const myBids = [
    {
      id: 1,
      projectTitle: 'Разработка сайта для стартапа',
      budget: 1200,
      sentDays: 2,
      status: 'pending',
    },
    {
      id: 2,
      projectTitle: 'Mobile App UI/UX',
      budget: 800,
      sentDays: 5,
      status: 'rejected',
    },
    {
      id: 3,
      projectTitle: 'AI Chatbot Integration',
      budget: 1500,
      sentDays: 1,
      status: 'accepted',
    },
  ];

  const invitations = [
    {
      id: 1,
      projectTitle: 'NFT Marketplace Development',
      client: 'Alex Morgan',
      budget: 2500,
      receivedDays: 1,
    },
    {
      id: 2,
      projectTitle: 'SaaS Dashboard Redesign',
      client: 'Emma Wilson',
      budget: 1800,
      receivedDays: 3,
    },
  ];

  const statusConfig = {
    pending: { label: 'Ожидает ответа', color: 'bg-yellow-100 text-yellow-700' },
    rejected: { label: 'Отклонено', color: 'bg-red-100 text-red-700' },
    accepted: { label: 'Принято', color: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📩 Отклики и приглашения</h1>
        <p className="mt-2 text-gray-600">Управляйте предложениями на проекты</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('bids')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'bids'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Мои отклики ({myBids.length})
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'invitations'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Приглашения от клиентов ({invitations.length})
        </button>
      </div>

      {/* My Bids */}
      {activeTab === 'bids' && (
        <div className="space-y-4">
          {myBids.map((bid) => (
            <div
              key={bid.id}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{bid.projectTitle}</h3>
                    <Badge className={statusConfig[bid.status as keyof typeof statusConfig].color}>
                      {statusConfig[bid.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Бюджет ${bid.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Отправлено {bid.sentDays} дня назад</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/projects/${bid.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                      Открыть проект
                    </Button>
                  </Link>
                  {bid.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4" />
                      Отозвать
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invitations */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="rounded-2xl border-2 border-primary-200 bg-primary-50 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {invitation.projectTitle}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Приглашение от: <span className="font-semibold">{invitation.client}</span>
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Бюджет ${invitation.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Получено {invitation.receivedDays} дня назад</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <X className="h-4 w-4" />
                    Отклонить
                  </Button>
                  <Button size="sm">
                    <Check className="h-4 w-4" />
                    Принять
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
