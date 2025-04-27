import React from 'react';
import { useButtonSound } from "../../utils/ButtonSound";

interface ButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', size = 'w-1/3' }) => {
  const { playSound } = useButtonSound();

  const baseStyle = "py-4 px-4 md:py-3 text-lg font-extrabold rounded-xl transition shadow-lg border-b-4 border-r-4 border-[#FF8A00] bg-clip-border hover:scale-110";
  const primary = "bg-gradient-to-bl from-[#F9BB06] to-[#E98D0E] hover:bg-rd-secondary text-white hover:text-white";
  const secondary = "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100";

  return (
    <button
      onClick={() => {
        playSound();
        onClick?.();
      }}
      className={`${baseStyle} ${variant === 'primary' ? primary : secondary} ${size} font-poppins`}
    >
      {text}
    </button>
  );
};

export default Button;
