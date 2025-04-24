import React from 'react';

interface HitpointsProps {
  lives: number;
}

const Hitpoints: React.FC<HitpointsProps> = ({ lives }) => {
  const hearts = Array.from({ length: lives }, (_, i) => (
    <span key={i} className="text-red-500">
      ❤️
    </span>
  ));

  return (
    <div className="text-lg font-semibold">
      Hp: {hearts}
    </div>
  );
};

export default Hitpoints;
