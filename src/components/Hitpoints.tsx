import React from 'react';

interface HitpointsProps {
  lives: number;
}

const Hitpoints: React.FC<HitpointsProps> = ({ lives }) => {
  const hearts = Array.from({ length: lives }, (_, i) => (
    <span key={i} className="text-red-500 text-3xl">
      ❤️
    </span>
  ));

  return (
    <div className="text-lg font-semibold">
      {hearts}
    </div>
  );
};

export default Hitpoints;
