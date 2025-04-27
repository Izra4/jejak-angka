import { useRef } from "react";
import correctSfx from "../assets/sound/correct.mp3";

export const CorrectSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playCorrectSound = () => {
    if (!audioRef.current) {
      const audio = new Audio(correctSfx);
      audio.volume = 0.3;
      audioRef.current = audio;
      audio.play();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play();
    }
  };

  return { playCorrectSound };
};
