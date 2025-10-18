'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Send, Paperclip, DollarSign, AlertCircle, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '👨‍💼',
    lastMessage: 'Sounds good! Let me know when you start.',
    timestamp: '2 min ago',
    unread: 2,
    project: 'E-commerce Dashboard',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: '👩‍💼',
    lastMessage: 'Thanks for the update!',
    timestamp: '1 hour ago',
    unread: 0,
    project: 'RAG Support Assistant',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: '👨‍🔧',
    lastMessage: 'Can we schedule a call?',
    timestamp: '3 hours ago',
    unread: 1,
    project: 'Mobile App Redesign',
  },
];

const messages = [
  {
    id: '1',
    sender: 'John Doe',
    content: "Hi! I reviewed your proposal and I'm interested in working with you.",
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: '2',
    sender: 'You',
    content: "Great! I'm excited to work on this project. When would you like to start?",
    timestamp: '10:32 AM',
    isOwn: true,
  },
  {
    id: '3',
    sender: 'John Doe',
    content: 'As soon as possible. Can you start this week?',
    timestamp: '10:35 AM',
    isOwn: false,
  },
  {
    id: '4',
    sender: 'You',
    content: 'Yes, I can start tomorrow. Let me create the escrow deal.',
    timestamp: '10:37 AM',
    isOwn: true,
  },
  {
    id: '5',
    sender: 'John Doe',
    content: 'Sounds good! Let me know when you start.',
    timestamp: '10:40 AM',
    isOwn: false,
  },
];

const dealInfo = {
  status: 'In Escrow',
  amount: 2000,
  deadline: 'Jan 24, 2025',
};

export default function ChatPage() {
  const [messageInput, setMessageInput] = useState('');

  const handleSend = () => {
    if (messageInput.trim()) {
      // Handle send message
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          </div>
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50"
              >
                <div className="text-3xl">{conv.avatar}</div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{conv.name}</div>
                    <div className="text-xs text-gray-500">{conv.timestamp}</div>
                  </div>
                  <div className="text-sm text-gray-600">{conv.project}</div>
                  <div className="truncate text-sm text-gray-500">{conv.lastMessage}</div>
                </div>
                {conv.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">👨‍💼</div>
              <div>
                <div className="font-semibold text-gray-900">John Doe</div>
                <div className="text-sm text-gray-600">E-commerce Dashboard</div>
              </div>
            </div>
            <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 ${
                      message.isOwn
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.isOwn ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-2">
              <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSend}
                className="rounded-lg bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <DollarSign className="h-4 w-4" />
                Create Escrow
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                <AlertCircle className="h-4 w-4" />
                Open Dispute
              </button>
            </div>
          </div>
        </div>

        {/* Deal Info Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Deal Status</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4">
              <div className="text-sm font-medium text-green-900">Status</div>
              <div className="mt-1 text-lg font-bold text-green-700">{dealInfo.status}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-900">Amount</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">${dealInfo.amount}</div>
              <div className="mt-1 text-xs text-gray-500">USDC on Base</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-900">Deadline</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">{dealInfo.deadline}</div>
            </div>
            <button className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700">
              View Full Deal
            </button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Project Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium text-gray-900">Custom</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Started</span>
                <span className="font-medium text-gray-900">Jan 10, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">14 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
