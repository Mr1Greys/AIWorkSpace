'use client';

import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Button } from '@aiworkspace/ui';

const chats = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '👨‍💼',
    lastMessage: 'Когда сможете начать работу?',
    time: '10 мин назад',
    unread: 2,
    project: 'E-commerce Dashboard',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    lastMessage: 'Отлично, жду результат!',
    time: '2 часа назад',
    unread: 0,
    project: 'Mobile App Redesign',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: '👨‍🔧',
    lastMessage: 'Спасибо за быстрый ответ',
    time: '1 день назад',
    unread: 0,
    project: 'AI Chatbot',
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'client',
      text: 'Здравствуйте! Интересует разработка дашборда.',
      time: '14:30',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Добрый день! Да, конечно. Расскажите подробнее о проекте.',
      time: '14:32',
    },
    {
      id: 3,
      sender: 'client',
      text: 'Нужен современный дашборд для e-commerce с аналитикой.',
      time: '14:35',
    },
    {
      id: 4,
      sender: 'me',
      text: 'Понял. Могу сделать за 2 недели. Бюджет $1200 подходит?',
      time: '14:40',
    },
    {
      id: 5,
      sender: 'client',
      text: 'Когда сможете начать работу?',
      time: '15:20',
    },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Chat List */}
      <div className="w-80 rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">💬 Сообщения</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                selectedChat.id === chat.id ? 'bg-primary-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{chat.avatar}</div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{chat.project}</p>
                  <p className="truncate text-sm text-gray-600">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                    {chat.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white">
        {/* Chat Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedChat.avatar}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
              <p className="text-sm text-gray-600">{selectedChat.project}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100% - 140px)' }}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2 ${
                    msg.sender === 'me'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === 'me' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setMessage('');
                }
              }}
            />
            <Button>
              <Send className="h-4 w-4" />
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
