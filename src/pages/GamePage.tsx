import React, { useEffect, useRef, useState } from "react";
import GridCell from "../components/Grid";
import Score from "../components/Score";
import Hitpoints from "../components/Hitpoints";
import { useLocation, useNavigate } from "react-router-dom";
import { levelPatterns } from "../data/patterns";
import char from "../assets/icons/char.png";

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || 1;
  const pattern = levelPatterns[level] || levelPatterns[1];
  const count = pattern.length;

  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctOrder, setCorrectOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
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

  const renderSVG = (coords: { x: number; y: number }[]) => (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
      {coords.map((point, i) => {
        const next = coords[i + 1];
        if (!next) return null;
        return (
          <line
            key={i}
            x1={point.x}
            y1={point.y}
            x2={next.x}
            y2={next.y}
            stroke={level === 1 ? "blue" : level === 2 ? "red" : "purple"}
            strokeWidth="4"
          />
        );
      })}
      {coords.length === correctOrder.length && coords.length > 1 && (
        <line
          x1={coords[coords.length - 1].x}
          y1={coords[coords.length - 1].y}
          x2={coords[0].x}
          y2={coords[0].y}
          stroke="red"
          strokeWidth="4"
        />
      )}
    </svg>
  );

  const renderGrid = (ref: React.RefObject<HTMLDivElement>) => (
    <div ref={ref} className="relative w-full flex justify-center">
      {renderSVG(selectedCoords)}
      <div className="grid grid-cols-10 gap-1 sm:gap-2 w-full max-w-[90vmin] relative z-10">
        {gridNumbers.map((num, i) => (
          <GridCell
            key={i}
            number={num}
            isStart={num === correctOrder[0]}
            isSelected={correctOrder.includes(num) && correctOrder.indexOf(num) < currentIndex}
            onClick={(e) => handleCellClick(num, e)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-[#AFEEEE] font-poppins text-black">
      {/* DESKTOP */}
      <div className="hidden md:flex flex-row w-full h-full p-6 gap-6">
        {/* Grid Kiri */}
        <div className="w-3/5">{renderGrid(desktopRef)}</div>

        {/* Info Kanan */}
        <div className="w-2/5 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-orange-600 mb-4">Level {level}</h1>
            <div className="flex justify-between items-center mb-2">
              <Hitpoints lives={lives} />
              <Score score={score} />
            </div>
            <p className="font-semibold text-lg">
              Yuk temukan {correctOrder.length - currentIndex} angka lagi untuk memenangkan level ini!
            </p>
          </div>
          <div className="flex flex-col items-center mt-auto">
            {feedback && showPopup && (
              <div className={`p-3 mt-4 rounded-lg text-center ${feedback.type === "success" ? "bg-green-400" : "bg-red-300"}`}>
                {feedback.message}
              </div>
            )}
            <img src={char} alt="character" className="w-40 h-40 md:w-64 md:h-64 mt-4" />
            <button onClick={() => navigate("/")} className="mt-4 text-sm text-blue-600 hover:underline">
              ⬅ Kembali ke Menu Utama
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col md:hidden w-full p-4 gap-4 items-center">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Level {level}</h1>
          <div className="flex justify-center gap-4 items-center mb-2">
            <Hitpoints lives={lives} />
            <Score score={score} />
          </div>
          <p className="text-base font-medium">
            Yuk temukan {correctOrder.length - currentIndex} angka lagi untuk memenangkan level ini!
          </p>
        </div>

        {renderGrid(mobileRef)}

        {feedback && showPopup && (
          <div className={`p-3 rounded-lg text-center ${feedback.type === "success" ? "bg-green-400" : "bg-red-300"}`}>
            {feedback.message}
          </div>
        )}

        <img src={char} alt="character" className="w-32 h-32 mt-4" />
        <button onClick={() => navigate("/")} className="mt-2 text-sm text-blue-600 hover:underline">
          ⬅ Kembali ke Menu Utama
        </button>
      </div>
    </div>
  );
};

export default GamePage;
