import React from 'react';

interface PopupMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  visible: boolean;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ type, message, visible }) => {
  if (!visible) return null;

  const baseStyle = "px-6 py-3 rounded-xl text-center font-bold shadow-lg text-white text-lg animate-bounce";
  const colorMap = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 ${baseStyle} ${colorMap[type]}`}>
      {message}
    </div>
  );
};

export default PopupMessage;
