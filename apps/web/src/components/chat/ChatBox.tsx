'use client';

import { useState, useEffect } from 'react';

interface ChatBoxProps {
  projectId: string;
}

export default function ChatBox({ projectId }: ChatBoxProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Socket.io integration will be implemented here
    // const socket = io(API_URL);
    // socket.emit('join', projectId);
    // socket.on('new-message', handleNewMessage);
    // return () => socket.disconnect();
  }, [projectId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Send message logic
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Чат по проекту</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Нет сообщений</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="flex gap-2">
              <div className="bg-gray-100 rounded-lg p-3">
                <p>{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Введите сообщение..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
