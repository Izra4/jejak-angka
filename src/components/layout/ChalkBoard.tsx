import React from "react";

const ChalkBoard: React.FC = () => {
  return (
    <div className="bg-green-900 border-4 border-rd-primary rounded-lg p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden mt-4 lg:ml-4 z-20">
      <div className="absolute top-2 left-2 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-800"></div>
      <div className="absolute top-2 right-2 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-800"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-800"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-800"></div>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center italic tracking-wide">
        Petunjuk
      </h1>

      <div className="text-white space-y-6">
        <div>
          <p className="text-xl font-semibold mb-2 italic tracking-wide">Cara Bermain:</p>
          <ul className="list-disc pl-5 space-y-2 italic tracking-wide">
            <li>Klik angka secara berurutan dimulai dari angka yang dilingkari hijau.</li>
            <li>Lanjutkan ke angka berikutnya (contoh: 8.731 → 8.732 → 8.733).</li>
            <li>Selesaikan hingga semua angka benar dan membentuk pola.</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2 italic tracking-wide">Ingat:</p>
          <ul className="list-disc pl-5 space-y-2 italic tracking-wide">
            <li>✅ Benar: Muncul lingkaran hijau.</li>
            <li>❌ Salah: Muncul notifikasi untuk mencoba lagi.</li>
            <li>✨ Semua benar: Muncul pola unik.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChalkBoard;
