import React from "react";
import sand from "../../assets/images/sand.png";

const SandBackground: React.FC = () => {
  return (
    <img
      src={sand}
      alt="Background"
      className="absolute bottom-0 lg:-bottom-10 left-0 w-full h-auto object-cover z-0"
    />
  );
};

export default SandBackground;
