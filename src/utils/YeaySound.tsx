import { useRef } from "react";
import yeaySfx from "../assets/sound/yeay.mp3";

export const YeaySound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const yeaySound = () => {
    if (!audioRef.current) {
      const audio = new Audio(yeaySfx);
      audio.volume = 0.5;
      audioRef.current = audio;
      audio.play();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play();
    }
  };

  return { yeaySound };
};
