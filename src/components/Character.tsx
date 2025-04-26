import React from "react";
import char from "../assets/icons/char.png";

interface CharacterProps {
  position?: "bottom-right" | "bottom-left";
  size?: "small" | "large";
  onClick?: () => void;
}

const Character: React.FC<CharacterProps> = ({
  position = "bottom-right",
  size = "large",
  onClick,
}) => {
  const positionClass = position === "bottom-right" ? "bottom-6 right-4" : "bottom-6 left-4";
  const sizeClass = size === "large" ? "w-64 h-64" : "w-32 h-32";

  return (
    <img
      src={char}
      alt="character"
      onClick={onClick}
      className={`absolute ${positionClass} z-10 ${sizeClass} transition ease-in-out duration-300 hover:scale-110 cursor-pointer`}
    />
  );
};

export default Character;
