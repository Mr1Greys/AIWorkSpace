'use client';

import Image from 'next/image';

interface CaseCardProps {
  case: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    thumbnailUrl?: string;
    durationDays?: number;
    budget?: number;
  };
}

export default function CaseCard({ case: caseData }: CaseCardProps) {
  return (
    <div className="group relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      {caseData.thumbnailUrl && (
        <div className="aspect-video relative">
          <Image 
            src={caseData.thumbnailUrl} 
            alt={caseData.title}
            fill
            className="object-cover"
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-center">
            <p className="text-white text-sm">{caseData.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {caseData.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary-600 text-white text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-white">
        <h3 className="font-semibold mb-2">{caseData.title}</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          {caseData.durationDays && <span>⏱️ {caseData.durationDays} дней</span>}
          {caseData.budget && <span>💰 ${caseData.budget}</span>}
        </div>
      </div>
    </div>
  );
}
