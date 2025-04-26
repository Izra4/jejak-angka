import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { levelPatterns } from "../data/patterns";

import GameGrid from "../components/grid/GameGrid";
import GameInfo from "../components/game/GameInfo";
import GameFooter from "../components/game/GameFooter";

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 1;
  const pattern = levelPatterns[level] || levelPatterns[1];
  const count = pattern.length;

  const desktopRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [correctOrder, setCorrectOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [selectedCoords, setSelectedCoords] = useState<{ x: number; y: number }[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const start = level === 1 ? 8000 : level === 2 ? 7000 : 5000;
    const ordered = Array.from({ length: count }, (_, i) => start + i);

    const grid = Array.from({ length: TOTAL_CELLS }, () =>
      Math.floor(Math.random() * (9999 - 1000) + 1000)
    );

    pattern.forEach((point, i) => {
      const index = point.row * GRID_SIZE + point.col;
      grid[index] = ordered[i];
    });

    setGridNumbers(grid);
    setCorrectOrder(ordered);
    setCurrentIndex(0);
    setScore(0);
    setLives(4);
    setSelectedCoords([]);
  }, [count, level, pattern]);

  useEffect(() => {
    if (currentIndex === correctOrder.length && correctOrder.length > 0) {
      setTimeout(() => {
        navigate("/result", {
          state: { score, success: true, level },
        });
      }, 1500);
    }
  }, [currentIndex, correctOrder, navigate, score, level]);

  const showTempPopup = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);
  };

  const handleCellClick = (num: number, event: React.MouseEvent) => {
    const ref = isMobile ? mobileRef.current : desktopRef.current;
    const containerRect = ref?.getBoundingClientRect();

    if (num === correctOrder[currentIndex] && containerRect) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setSelectedCoords((prev) => [
        ...prev,
        {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        },
      ]);

      if (currentIndex === 0) {
        showTempPopup("success", "✅ Awal yang baik! Lanjutkan!");
      }

      setCurrentIndex((prev) => prev + 1);
      setScore((prev) => prev + 10);
    } else {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => navigate("/result", { state: { score, success: false } }), 1200);
        }
        return newLives;
      });

      setScore((prev) => prev - 5);
      showTempPopup("error", "❌ Salah angka! Coba lagi ya!");
    }
  };

  const handleBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-[#AFEEEE] font-poppins text-black">
      {/* DESKTOP */}
      <div className="hidden md:flex flex-row w-full h-full p-6 gap-6">
        <div className="w-3/5">
          <GameGrid
            refProp={desktopRef}
            gridNumbers={gridNumbers}
            correctOrder={correctOrder}
            currentIndex={currentIndex}
            selectedCoords={selectedCoords}
            level={level}
            onClick={handleCellClick}
          />
        </div>

        <div className="w-2/5 flex flex-col justify-between">
          <GameInfo
            level={level}
            lives={lives}
            score={score}
            current={currentIndex}
            total={correctOrder.length}
          />
          <GameFooter feedback={feedback} show={showPopup} onBack={handleBack} />
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col md:hidden w-full p-4 gap-4 items-center">
        <GameInfo
          level={level}
          lives={lives}
          score={score}
          current={currentIndex}
          total={correctOrder.length}
        />
        <GameGrid
          refProp={mobileRef}
          gridNumbers={gridNumbers}
          correctOrder={correctOrder}
          currentIndex={currentIndex}
          selectedCoords={selectedCoords}
          level={level}
          onClick={handleCellClick}
        />
        <GameFooter feedback={feedback} show={showPopup} onBack={handleBack} />
      </div>
    </div>
  );
};

export default GamePage;
