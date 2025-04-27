import { useRef } from "react";
import wrongSfx from "../assets/sound/wrong.mp3";

export const WrongSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playWrongSound = () => {
    if (!audioRef.current) {
      const audio = new Audio(wrongSfx);
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

  return { playWrongSound };
};
