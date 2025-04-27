import React from "react";
import back from "../../assets/icons/back.png";

interface BackButtonProps {
  onClick: () => void;
  absolute?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, absolute }) => {
  return (
    <img
      src={back}
      alt="Back"
      className={`w-6 h-6 lg:w-10 lg:h-10 transition ease-in-out duration-300 hover:scale-125 cursor-pointer ${
        absolute ? "lg:absolute top-6 left-6" : ""
      } z-20`}
      onClick={onClick}
    />
  );
};

export default BackButton;
