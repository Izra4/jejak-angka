import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="text-lg font-semibold text-green-700">
      Skor: {score}
    </div>
  );
};

export default Score;
