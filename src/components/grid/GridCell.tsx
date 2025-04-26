import React, { forwardRef } from "react";

interface GridCellProps {
  number: number;
  isSelected?: boolean;
  isStart?: boolean;
  isWrong?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const GridCell = forwardRef<HTMLDivElement, GridCellProps>(
  ({ number, isSelected, isStart, isWrong, onClick }, ref) => {
    let bgColor = "bg-white";
    let borderColor = "border-gray-500";

    if (isSelected) {
      bgColor = "bg-green-300 border-green-700";
    }

    if (isWrong) {
      bgColor = "bg-red-300";
      borderColor = "border-red-400";
    }

    if (isStart && !isSelected) {
      borderColor = "border-green-700 border-3";
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`w-full aspect-square flex items-center justify-center border ${borderColor} rounded-lg cursor-pointer select-none text-xs sm:text-base ${bgColor} hover:scale-105 transition`}
      >
        {number}
      </div>
    );
  }
);

export default GridCell;
