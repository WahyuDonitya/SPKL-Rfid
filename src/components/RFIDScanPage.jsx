import React, { useEffect, useState } from "react";
import logo from "../assets/image/21-removebg-preview.png";

const dummyData = {
  1234567890: {
    nik: "EMP001",
    nama: "Budi Santoso",
    foto: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  "0987654321": {
    nik: "EMP002",
    nama: "Siti Aminah",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
};

export default function RFIDScanPage() {
  const [buffer, setBuffer] = useState("");
  const [dataKaryawan, setDataKaryawan] = useState(null);
  const [lastScanTime, setLastScanTime] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        const hasilScan = buffer.trim();
        console.log();
        if (dummyData[hasilScan]) {
          setDataKaryawan(dummyData[hasilScan]);
          setLastScanTime(new Date());
        } else {
          setDataKaryawan(null);
        }
        setBuffer("");
      } else {
        setBuffer((prev) => prev + e.key);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [buffer]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-10 text-center border-t-8 border-red-600">
        <div className="mb-6">
          <img
            src={logo}
            alt="Logo Perusahaan"
            className="mx-auto w-48 h-auto"
          />
          <h1 className="text-2xl font-bold text-red-700 uppercase tracking-wide">
            Join SPKL
          </h1>
          <p className="text-gray-500">Silakan tempelkan kartu RFID Anda</p>
        </div>

        {/* Hasil Scan */}
        {dataKaryawan ? (
          <div className="flex flex-col items-center mt-6">
            <img
              src={dataKaryawan.foto}
              alt="Foto Karyawan"
              className="w-36 h-36 rounded-full border-4 border-red-400 shadow-lg object-cover mb-4"
            />
            <p className="text-lg text-gray-700 font-semibold">
              NIK: {dataKaryawan.nik}
            </p>
            <p className="text-2xl font-bold text-red-600">
              {dataKaryawan.nama}
            </p>
            {lastScanTime && (
              <p className="text-sm text-gray-500 mt-2">
                Bergabung pada: {lastScanTime.toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <div className="animate-pulse">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4"></div>
              <p className="text-red-500 font-semibold">
                Menunggu kartu RFID...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



