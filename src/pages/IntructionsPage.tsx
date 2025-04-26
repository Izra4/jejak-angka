import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import ChalkBoard from "../components/layout/ChalkBoard";
import Character from "../components/ui/Character";
import SandBackground from "../components/layout/SandBackground";
import Button from "../components/button/Button";

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleCharClick = () => {
    setShowPopup(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 1500);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#AFEEEE] flex flex-col lg:flex-row p-6 font-poppins relative overflow-hidden lg:justify-center">
      <BackButton onClick={() => navigate("/")} />
      <div className="w-full max-w-2xl">
        <ChalkBoard />
        <div className="flex justify-center items-center mt-6 lg:mt-8 z-30 relative">
          <Button text="MAIN SEKARANG" onClick={() => navigate("/game", { state: { level: 1 } })} />
        </div>
      </div>
      {showPopup && (
        <div
          className={`absolute bottom-72 right-10 bg-white text-black px-4 py-2 rounded shadow-lg z-20 transition-opacity duration-500 ease-in-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          Yuk main! Kamu pasti bisa!!!
        </div>
      )}
      <Character onClick={handleCharClick} position="bottom-right" size="large" />
      <SandBackground />
    </div>
  );
};

export default InstructionsPage;
