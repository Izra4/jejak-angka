import React from "react";
import Button from "../components/button/Button";
import PlayButton from "../components/button/PlayButton";
import Background from "../components/Background";
import Character from "../components/Character";
import Title from "../components/Title";  
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Background />
      <Character position="bottom-right" size="large" />
      <div className="flex flex-col items-center w-full h-full">
        <Title />
        <PlayButton size={104} onClick={() => navigate("/game", { state: { level: 1 } })} />
        <div className="w-1/2 flex flex-col md:flex-row justify-center items-center md:justify-between mt-16">
          <Button text="PETUNJUK" onClick={() => navigate("/instructions")} />
          <Button text="LEVEL 1" onClick={() => navigate("/game", { state: { level: 1 } })} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
