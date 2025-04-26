// components/GameFooter.tsx
import React from "react";
import char from "../../assets/icons/char.png";

interface GameFooterProps {
  feedback: { type: "success" | "error"; message: string } | null;
  show: boolean;
  onBack: () => void;
}

const GameFooter: React.FC<GameFooterProps> = ({ feedback, show, onBack }) => (
  <div className="flex flex-col items-center mt-4 w-full">
    {feedback && show && (
      <div
        className={`p-3 rounded-lg text-center whitespace-pre-line ${
          feedback.type === "success" ? "bg-green-400" : "bg-red-300"
        }`}
      >
        {feedback.message}
      </div>
    )}
    <img src={char} alt="character" className="w-32 h-32 md:w-64 md:h-64 mt-4" />
    <button onClick={onBack} className="mt-4 text-sm text-blue-600 hover:underline">
      ⬅ Kembali ke Menu Utama
    </button>
  </div>
);

export default GameFooter;
