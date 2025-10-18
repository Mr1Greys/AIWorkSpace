'use client';

interface Match {
  freelancer: any;
  score: number;
  breakdown: {
    tagMatch: number;
    pastSuccess: number;
    availability: number;
    budgetFit: number;
  };
}

interface MatchListProps {
  matches: Match[];
}

export default function MatchList({ matches }: MatchListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Подходящие специалисты</h3>
      <div className="grid gap-4">
        {matches.map((match, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{match.freelancer?.name || 'Специалист'}</h4>
                <p className="text-sm text-gray-600">Совпадение: {Math.round(match.score * 100)}%</p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
                Связаться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
