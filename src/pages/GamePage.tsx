import React, { useEffect, useRef, useState } from 'react';
import GridCell from '../components/Grid';
import Score from '../components/Score';
import Hitpoints from '../components/Hitpoints';
import PopupMessage from '../components/PopupMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { levelPatterns } from '../data/patterns';
import char from '../assets/icons/char.png';

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const level = location.state?.level || 1;
  const pattern = levelPatterns[level] || levelPatterns[1];
  const count = pattern.length;

  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctOrder, setCorrectOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(4);
  const [selectedCoords, setSelectedCoords] = useState<{ x: number; y: number }[]>([]);

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
        navigate('/result', {
          state: {
            score,
            success: true,
            level,
          },
        });
      }, 1500);
    }
  }, [currentIndex, correctOrder, navigate, score, level]);  

  const showTempPopup = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);
  };

  const handleCellClick = (num: number, event: React.MouseEvent) => {
    if (num === correctOrder[currentIndex]) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        setSelectedCoords((prev) => [
          ...prev,
          {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          },
        ]);
      }

      if (currentIndex === 0) {
        showTempPopup('success', 'Yay! Awal yang baik!');
      }
      setCurrentIndex((prev) => prev + 1);
      setScore((prev) => prev + 10);
    } else {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => navigate('/result', { state: { score, success: false } }), 1200);
        }
        return newLives;
      });

      if (currentIndex > 0) {
        showTempPopup('error', 'X Ooops X Angka tidak besar dari sebelumnya , coba lagi ya !!!');
      } else {
        showTempPopup('error', 'X Ooops X Pilih angka yang bewarna hijau dulu ya !!!');
      }

      setScore((prev) => prev - 5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 p-6 flex flex-row items-center font-poppins">
      <div ref={containerRef} className="w-3/5 relative">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          {selectedCoords.map((point, i) => {
            const next = selectedCoords[i + 1];
            if (!next) return null;
            return (
              <line
                key={i}
                x1={point.x}
                y1={point.y}
                x2={next.x}
                y2={next.y}
                stroke={level === 1 ? 'blue' : level === 2 ? 'red' : 'purple'}
                strokeWidth="4"
              />
            );
          })}
          
            {selectedCoords.length === correctOrder.length && 
            selectedCoords.length > 1 &&
            selectedCoords[0] &&
            selectedCoords[selectedCoords.length - 1] && (
            <>
              <line
                x1={selectedCoords[selectedCoords.length - 1].x}
                y1={selectedCoords[selectedCoords.length - 1].y}
                x2={selectedCoords[0].x}
                y2={selectedCoords[0].y}
                stroke="red"
                strokeWidth="4"
              />
              <polygon
              points={selectedCoords
                .map((point) => `${point.x},${point.y}`)
                .join(' ')}
              fill="rgba(255, 0, 0, 0.8)"
              stroke="none"
              />
            </>
            )}
        </svg>

        <div className="grid grid-cols-10 gap-2 relative z-10">
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
      
      <div className='w-2/5 flex flex-col items-start justify-start self-start h-fit'>
        <h1 className="font-bold text-orange-600 mb-4 text-4xl">
          Level {level}
        </h1>

        {feedback && (
          <PopupMessage type={feedback.type} message={feedback.message} visible={showPopup} />
        )}

        <div className="flex justify-between items-center w-full max-w-3xl mb-4">
          <Hitpoints lives={lives} />
          <Score score={score} />
        </div>

        <p className='font-semibold text-2xl text-center'>
          Yuk temukan {correctOrder.length - currentIndex} angka lagi untuk memenangkan level ini !!!
        </p>
        
        <div className='w-full flex justify-center items-center'>
          <img 
            src={char} 
            alt="character" 
            className='w-72 h-72 item'  
          />
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-blue-500 hover:underline"
        >
          ⬅ Kembali ke Menu Utama
        </button>
      </div>
    </div>
  );
};

export default GamePage;
