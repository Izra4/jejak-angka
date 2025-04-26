import React from "react";
import Hitpoints from "../ui/Hitpoints";
import Score from "../ui/Score";

interface GameInfoProps {
  level: number;
  lives: number;
  score: number;
  current: number;
  total: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ level, lives, score, current, total }) => (
  
  <div>
    {/* MOBILE */}
    <div className="md:hidden w-full flex flex-col space-y-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col text-start -space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">Level {level}</h1>
          <Score score={score} />
        </div>
        <div className="flex justify-center md:justify-between gap-4 items-center mb-2">
          <Hitpoints lives={lives} />
        </div>
      </div>
      <p className="md:text-lg text-center text-xl font-semibold">
        Yuk temukan {total - current} angka lagi untuk memenangkan level ini!
      </p>
    </div>

    {/* DESKTOP */}
    <div className="hidden w-full text-center md:block">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">Level {level}</h1>
      <div className="flex justify-center md:justify-between gap-4 items-center mb-2">
        <Hitpoints lives={lives} />
        <Score score={score} />
      </div>
      <p className="text-base md:text-lg font-medium">
        Yuk temukan {total - current} angka lagi untuk memenangkan level ini!
      </p>
    </div>
  </div>
);

export default GameInfo;
