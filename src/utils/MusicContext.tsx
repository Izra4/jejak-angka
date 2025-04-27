import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import musicSrc from "../assets/sound/main.mp3"; // sesuaikan path kamu

interface MusicContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(musicSrc));
  const [isSoundOn, setIsSoundOn] = useState(false); // Awalnya false (mute)

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;
    // Awal: Jangan play otomatis
    // User harus klik dulu toggleSound
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (isSoundOn) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.log("Autoplay blocked:", e));
    }
    setIsSoundOn((prev) => !prev);
  };

  return (
    <MusicContext.Provider value={{ isSoundOn, toggleSound }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
};
