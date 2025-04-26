// components/GameGrid.tsx
import React from "react";
import GridCell from "./GridCell";

interface Coord {
  x: number;
  y: number;
}

interface GameGridProps {
  refProp: React.RefObject<HTMLDivElement | null>;
  gridNumbers: number[];
  correctOrder: number[];
  currentIndex: number;
  selectedCoords: Coord[];
  level: number;
  onClick: (num: number, e: React.MouseEvent) => void;
}

const GameGrid: React.FC<GameGridProps> = ({
  refProp,
  gridNumbers,
  correctOrder,
  currentIndex,
  selectedCoords,
  level,
  onClick,
}) => {
  const renderSVG = (coords: Coord[]) => (
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
            stroke={level === 1 ? "blue" : level === 2 ? "red" : "yellow"}
            strokeWidth="4"
          />
        );
      })}
      {coords.length === correctOrder.length && coords.length > 1 && (
        <>
          <line
            x1={coords[coords.length - 1].x}
            y1={coords[coords.length - 1].y}
            x2={coords[0].x}
            y2={coords[0].y}
            stroke="red"
            strokeWidth="4"
          />
          <polygon
            points={coords.map((p) => `${p.x},${p.y}`).join(" ")}
            fill={level === 1 ? "blue" : level === 2 ? "red" : "yellow"}
            stroke={"none"}
            opacity="0.8"
          />
        </>
)}
    </svg>
  );

  return (
    <div ref={refProp} className="relative w-full flex justify-center">
      {renderSVG(selectedCoords)}
      <div className="grid grid-cols-10 gap-1 sm:gap-2 w-full max-w-[90vmin] relative z-10">
        {gridNumbers.map((num, i) => (
          <GridCell
            key={i}
            number={num}
            isStart={num === correctOrder[0]}
            isSelected={correctOrder.includes(num) && correctOrder.indexOf(num) < currentIndex}
            onClick={(e) => onClick(num, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
