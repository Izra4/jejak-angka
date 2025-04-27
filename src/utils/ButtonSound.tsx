import { useRef } from "react";
import clickSfx from "../assets/sound/click.mp3";

export const useButtonSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (!audioRef.current) {
      const audio = new Audio(clickSfx);
      audio.volume = 0.5;
      audio.playbackRate = 1.5;
      audioRef.current = audio;
      audio.play();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play();
    }
  };

  return { playSound };
};
