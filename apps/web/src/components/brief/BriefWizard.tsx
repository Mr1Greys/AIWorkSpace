'use client';

import { useState } from 'react';

interface BriefWizardProps {
  onComplete: (brief: any) => void;
}

const steps = [
  { id: 'goal', title: 'Цель проекта' },
  { id: 'stack', title: 'Технологии' },
  { id: 'budget', title: 'Бюджет' },
  { id: 'timeline', title: 'Сроки' },
  { id: 'match', title: 'Подбор специалистов' }
];

export default function BriefWizard({ onComplete }: BriefWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [briefData, setBriefData] = useState({});

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Создание брифа</h2>
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded ${
                index <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h3>
        {/* Step content will be implemented */}
        <p className="text-gray-600">Компонент в разработке...</p>
      </div>
    </div>
  );
}
