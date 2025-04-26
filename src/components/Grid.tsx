import React, { forwardRef } from 'react';

interface GridCellProps {
  number: number;
  isSelected?: boolean;
  isStart?: boolean;
  isWrong?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const GridCell = forwardRef<HTMLDivElement, GridCellProps>(
  ({ number, isSelected, isStart, isWrong, onClick }, ref) => {
    let bgColor = 'bg-white';
    if (isSelected) bgColor = 'bg-green-300';
    if (isWrong) bgColor = 'bg-red-300';
    if (isStart) bgColor = 'bg-green-500 text-white font-bold';

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`w-full aspect-square flex items-center justify-center border rounded-lg cursor-pointer select-none text-xs sm:text-base ${bgColor} hover:scale-105 transition`}
      >
        {number}
      </div>
    );
  }
);

export default GridCell;
