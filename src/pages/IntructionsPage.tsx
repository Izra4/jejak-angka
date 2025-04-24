import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <div>
        <div className='w-full'>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">📘 Petunjuk Permainan</h1>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-black max-w-xl text-left space-y-4">
          <p className="text-xl font-semibold">Cara Bermain:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Klik angka secara berurutan dimulai dari angka yang dilingkari hijau.</li>
            <li>Lanjutkan ke angka berikutnya (contoh: 8.731 → 8.732 → 8.733).</li>
            <li>Selesaikan hingga semua angka benar dan membentuk pola.</li>
          </ul>
          <p className="text-xl font-semibold">Ingat:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>✅ Benar: Muncul lingkaran hijau.</li>
            <li>❌ Salah: Muncul notifikasi untuk mencoba lagi.</li>
            <li>✨ Semua benar: Muncul pola unik.</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 w-full max-w-xs">
          <Button text="➤ Mulai Bermain" onClick={() => navigate('/game')} />
          <Button text="➤ Kembali" variant='secondary' onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default InstructionsPage;
