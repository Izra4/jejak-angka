import { useRef } from "react";
import failSfx from "../assets/sound/fail.mp3";

export const FailSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const failSound = () => {
    if (!audioRef.current) {
      const audio = new Audio(failSfx);
      audio.volume = 1;
      audioRef.current = audio;
      audio.play();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
  };

  return { failSound };
};
