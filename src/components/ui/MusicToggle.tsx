import React from "react";
import { useMusic } from "../../utils/MusicContext";
import sound_on from "../../assets/icons/sound-on.png";
import sound_off from "../../assets/icons/sound-off.png";

interface MusicToggleButtonProps {
  absolute?: boolean;
}

const MusicToggleButton: React.FC<MusicToggleButtonProps> = ({ absolute = true }) => {
  const { isSoundOn, toggleSound } = useMusic();

  return (
    <button
      onClick={toggleSound}
      className={`transition-transform duration-300 ease-in-out hover:scale-110 z-20 ${
        absolute ? "absolute top-4 left-4" : ""
      }`}
    >
      <img
        src={isSoundOn ? sound_on : sound_off}
        alt={isSoundOn ? "Sound On" : "Sound Off"}
        className="md:w-12 md:h-12 w-7 h-7"
      />
    </button>
  );
};

export default MusicToggleButton;
