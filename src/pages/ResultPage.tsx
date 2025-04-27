import React, { useEffect } from "react";
import Button from "../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { YeaySound } from "../utils/YeaySound";
import { FailSound } from "../utils/FailSound copy";

interface LocationState {
  score: number;
  success: boolean;
  level: number;
  hp: number;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { score, success, level, hp } = state || { score: 0, success: false, level: 1, hp: 0 };
  const { yeaySound } = YeaySound();
  const { failSound } = FailSound();

  useEffect(() => {
    if (success) {
      yeaySound();
    } else {
      failSound();

    }
  }, [failSound, success, yeaySound]);

  return (
    <div className={`min-h-screen font-poppins
      ${success ? "bg-gradient-to-br from-green-100 to-lime-200" : 
                  "bg-gradient-to-br from-white to-red-200"} 
      flex flex-col items-center justify-center text-center p-6`}
    >
      <h1 className={`text-4xl font-bold mb-4 ${success ? "text-green-600" : "text-red-500"}`}>
        {success ? "🎉 Yeay Kamu Berhasil!" : "😢 Kesempatanmu Habis!"}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        {success
          ? "Selamat! Kamu menemukan pola angka ajaibnya!"
          : "Wah, kamu belum berhasil menemukan semua angkanya."}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 text-xl font-semibold text-gray-800 mb-8">
        Skor Akhir: <span className="text-green-600">{score}</span>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center">
        {success && level < 3 && (
          <Button
            text={
              <div className="flex items-center justify-center gap-2">
                <span>➡️</span>
                <span>Lanjut ke Level {level + 1}</span>
              </div>
            }
            onClick={() => navigate("/game", { state: { 
              level: level + 1,
              initScore: score,
              hp
            }})}
            size="w-3/4"
          />
        )}
        <Button
          text="🔁 Main Lagi"
          onClick={() => navigate("/game", { state: { level } })}
          size="w-3/4"
        />
        <Button
          text={
            <div className="flex items-center justify-center gap-2">
              <span>🏠</span>
              <p className="text-left">Menu Utama</p>
            </div>
          }
          onClick={() => navigate("/")}
          variant="secondary"
          size="w-3/4"
        />
      </div>
    </div>
  );
};

export default ResultPage;
