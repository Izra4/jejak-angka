import React from 'react';
import Button from '../components/button/Button';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  score: number;
  success: boolean;
  level: number;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const { score, success, level } = state || { score: 0, success: false, level: 1 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-lime-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className={`text-4xl font-bold mb-4 ${success ? 'text-green-600' : 'text-red-500'}`}>
        {success ? '🎉 Yeay Kamu Berhasil!' : '😢 Kesempatanmu Habis!'}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        {success
          ? 'Selamat! Kamu menemukan pola angka ajaibnya!'
          : 'Wah, kamu belum berhasil menemukan semua angkanya.'}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 text-xl font-semibold text-gray-800 mb-8">
        Skor Akhir: <span className="text-green-600">{score}</span>
      </div>

      <div className="flex flex-col gap-4">
        {success && level < 3 && (
          <Button
            text={`➡️ Lanjut ke Level ${level + 1}`}
            onClick={() => navigate('/game', { state: { level: level + 1 } })}
          />
        )}
        <Button text="🔁 Main Lagi" onClick={() => navigate('/game', { state: { level } })} />
        <Button text="🏠 Menu Utama" onClick={() => navigate('/')} variant="secondary" />
      </div>
    </div>
  );
};

export default ResultPage;
