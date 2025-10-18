'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Check, Clock, AlertCircle, ExternalLink, Upload, MessageSquare } from 'lucide-react';

const dealData = {
  id: '12345',
  title: 'E-commerce Dashboard Development',
  amount: 2000,
  currency: 'USDC',
  status: 'in_progress' as 'funded' | 'in_progress' | 'submitted' | 'approved' | 'disputed',
  client: {
    name: 'John Doe',
    avatar: '👨‍💼',
  },
  freelancer: {
    name: 'Alex Johnson',
    avatar: '👨‍💻',
  },
  createdAt: '2025-01-10',
  deadline: '2025-01-24',
  autoReleaseIn: '7 days',
  txHash: '0x1234...5678',
  chain: 'Base',
  timeline: [
    {
      status: 'funded',
      title: 'Escrow Funded',
      description: 'Client deposited $2,000 USDC',
      timestamp: '2025-01-10 14:30',
      completed: true,
    },
    {
      status: 'in_progress',
      title: 'Work In Progress',
      description: 'Freelancer started working on the project',
      timestamp: '2025-01-10 15:00',
      completed: true,
    },
    {
      status: 'submitted',
      title: 'Work Submitted',
      description: 'Awaiting client review',
      timestamp: null,
      completed: false,
    },
    {
      status: 'approved',
      title: 'Approved & Released',
      description: 'Payment released to freelancer',
      timestamp: null,
      completed: false,
    },
  ],
};

export default function DealPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
              <span>Deal ID:</span>
              <span className="font-mono font-semibold text-gray-900">{dealData.id}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{dealData.title}</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Status Card */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Deal Status</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Auto-release in {dealData.autoReleaseIn}
                    </p>
                  </div>
                  <StatusBadge status={dealData.status} />
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {dealData.timeline.map((item, index) => (
                    <div key={item.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            item.completed
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {item.completed ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {index < dealData.timeline.length - 1 && (
                          <div
                            className={`h-16 w-0.5 ${
                              item.completed ? 'bg-green-200' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                        {item.timestamp && (
                          <p className="mt-2 text-xs text-gray-500">{item.timestamp}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Actions</h2>
                <div className="space-y-3">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                    <Upload className="h-4 w-4" />
                    Submit Work
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                    <MessageSquare className="h-4 w-4" />
                    Message Client
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-6 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    Open Dispute
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Payment Info */}
              <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${dealData.amount} {dealData.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Chain</span>
                    <span className="font-medium text-gray-900">{dealData.chain}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="font-medium text-gray-900">{dealData.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <span className="font-medium text-gray-900">{dealData.deadline}</span>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <a
                    href={`https://basescan.org/tx/${dealData.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                  >
                    <span>View on Explorer</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Participants */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Participants</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{dealData.client.avatar}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {dealData.client.name}
                      </div>
                      <div className="text-xs text-gray-500">Client</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{dealData.freelancer.avatar}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {dealData.freelancer.name}
                      </div>
                      <div className="text-xs text-gray-500">Freelancer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: 'funded' | 'in_progress' | 'submitted' | 'approved' | 'disputed';
}) {
  const statusConfig = {
    funded: { label: 'Funded', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
    submitted: { label: 'Submitted', color: 'bg-purple-100 text-purple-700' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
    disputed: { label: 'Disputed', color: 'bg-red-100 text-red-700' },
  };

  const config = statusConfig[status];

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}
