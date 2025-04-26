import React from "react";
import mainBg from "../assets/images/main-bg.png";

const Background: React.FC = () => {
  return (
    <img
      src={mainBg}
      alt="Background"
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    />
  );
};

export default Background;
