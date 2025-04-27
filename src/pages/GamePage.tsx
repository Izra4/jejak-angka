import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { levelPatterns } from "../data/patterns";

import GameGrid from "../components/grid/GameGrid";
import GameInfo from "../components/game/GameInfo";
import GameFooter from "../components/game/GameFooter";
import BackButton from "../components/ui/BackButton";
import MusicToggleButton from "../components/ui/MusicToggle";
import { CorrectSound } from "../utils/CorrectSound";
import { WrongSound } from "../utils/WrongSound";

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 1;
  const initScore = location.state?.initScore || 0;
  const hp = location.state?.hp || 4;
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
  const { playCorrectSound } = CorrectSound();
  const {playWrongSound} = WrongSound();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const start = level === 1 ? 8000 : level === 2 ? 7000 : 5000;
    const ordered = Array.from({ length: count }, (_, i) => start + i);

    const minStart = level === 1 ? 8000 : level === 2 ? 7000 : 5000;
    const maxRange = 9999;

    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < TOTAL_CELLS) {
      const randomNum = Math.floor(Math.random() * (maxRange - minStart + 1)) + minStart;
      uniqueNumbers.add(randomNum);
    }
    const grid = Array.from(uniqueNumbers);

    pattern.forEach((point, i) => {
      const index = point.row * GRID_SIZE + point.col;
      grid[index] = ordered[i];
    });

    setGridNumbers(grid);
    setCorrectOrder(ordered);
    setCurrentIndex(0);
    setScore(initScore);
    setLives(hp);
    setSelectedCoords([]);
  }, [count, hp, initScore, level, pattern]);

  useEffect(() => {
    if (currentIndex === correctOrder.length && correctOrder.length > 0) {
      setTimeout(() => {
        navigate("/result", {
          state: { score, success: true, level, hp:lives },
        });
      }, 1500);
    }
  }, [currentIndex, correctOrder, navigate, score, level, lives]);

  const showTempPopup = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleCellClick = (num: number, event: React.MouseEvent) => {
    const ref = isMobile ? mobileRef.current : desktopRef.current;
    const containerRect = ref?.getBoundingClientRect();

    if (num === correctOrder[currentIndex] && containerRect) {
      playCorrectSound();
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setSelectedCoords((prev) => [
        ...prev,
        {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        },
      ]);

      showTempPopup("success", "✅ WOWWW ✅\nKamu Menemukan angka yang lebih besar dari sebelumnya, lanjutkan !!!");
      setCurrentIndex((prev) => prev + 1);
      setScore((prev) => prev + 10);
    } else {
      playWrongSound();
      if (currentIndex === 0) {
        showTempPopup("error", "❌ Ooops ❌\nPilih yang bewarna hijau dulu ya!");
      } else {
        setLives((prev) => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setTimeout(() => navigate("/result", { state: { score, success: false } }), 1200);
          }
          return newLives;
        });
        setScore((prev) => {
          const newScore = prev - 5;
          if (newScore < 0) return 0;
          return newScore;
        });
        showTempPopup("error", "❌ Ooops ❌\nAngka tidak besar dari sebelumnya , coba lagi ya !!!");
      }
      
    }
  };

  const handleBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-[#AFEEEE] font-poppins text-black">
      {/* DESKTOP */}
      <div className="hidden md:flex flex-row w-full h-full p-6">
      <div className="flex flex-col items-center space-y-3">
          <BackButton onClick={handleBack} absolute={false}/>
          <MusicToggleButton absolute={false}/>
        </div>
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
      <div className="flex flex-col md:hidden w-full p-4 gap-4">
        <div className="flex flex-row space-x-3">
          <BackButton onClick={handleBack} />
          <MusicToggleButton absolute={false}/>
        </div>
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

