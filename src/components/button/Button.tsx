import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  const baseStyle = "px-6 py-2 text-lg font-semibold rounded-3xl transition";
  const primary = "bg-white hover:bg-blue-600 text-blue-500 hover:text-white shadow-lg border border-blue-500 border-2";
  const secondary = "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variant === 'primary' ? primary : secondary} w-1/3 font-poppins`}
    >
      {text}
    </button>
  );
};

export default Button;
