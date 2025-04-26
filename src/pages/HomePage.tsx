import React, { useRef, useState, useEffect } from "react";
import Button from "../components/button/Button";
import PlayButton from "../components/button/PlayButton";
import Background from "../components/layout/Background";
import Character from "../components/ui/Character";
import cloud from "../assets/images/cloud.png";
import title_dtp from "../assets/icons/title-dtp.png";
import title_mbl from "../assets/icons/title-mbl.png";
import sound_on from "../assets/icons/sound-on.png";
import sound_off from "../assets/icons/sound-off.png";
import main from "../assets/sound/main.mp3";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (e) {
        console.log(e);
        setIsSoundOn(false); // Force the sound icon to "off" if playback fails
      }
    };

  playAudio();
  }, []);

  const toggleSound = () => {
    setIsSoundOn((prev) => {
      const newState = !prev;
      if (newState) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
      return newState;
    });
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <Background />
      {/* MUSIC BUTTON */}
      <button
        onClick={toggleSound}
        className="absolute top-4 left-4 transition-transform duration-300 ease-in-out hover:scale-120"
      >
        <img
          src={isSoundOn ? sound_on : sound_off}
          alt={isSoundOn ? "Sound On" : "Sound Off"}
          className="w-12 h-12"
        />
      </button>
      {/* AUDIO TAG */}
      <audio ref={audioRef} src={main} loop />
      <div className="mt-6 sm:hidden scale-105">
        <img src={cloud} alt="cloud" className="w-full h-full scale-110" />
      </div>
      {/* CHAR MOBILE */}
      <div className="hidden sm:block">
        <Character position="bottom-right" size="large" />
      </div>
      {/* CHAR DESKTOP */}
      <div className="sm:hidden">
        <Character position="bottom-right" size="small" />
      </div>
      <div className="flex flex-col items-center w-full h-full">
        {/* TITLE MOBILE */}
        <div className="sm:hidden">
          <img src={title_mbl} alt="title" className="w-4xl h-auto sm:mt-18" />
        </div>

        {/* TITLE DESKTOP */}
        <div className="hidden sm:block">
          <img src={title_dtp} alt="title" className="w-4xl h-auto mt-18" />
        </div>

        <div className="hidden md:block">
          <PlayButton size={104} onClick={() => navigate("/game", { state: { level: 1 } })} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-center items-center md:justify-between mt-16 space-y-4 lg:space-y-0 ">
          <Button text="PETUNJUK" onClick={() => navigate("/instructions")} />
          <Button text="LEVEL 1" onClick={() => navigate("/game", { state: { level: 1 } })} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
