import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/image/21-removebg-preview.png";
import LoadingComponent from "./LoadingComponent";

const dummyData = {
  "00000061881": {
    nik: "018119",
    nama: "Donit Ganteng",
    foto: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  "0002105940": {
    nik: "EMP002",
    nama: "Siti Aminah",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
};

export default function RFIDScanPage() {
  const [buffer, setBuffer] = useState("");
  const [dataKaryawan, setDataKaryawan] = useState(null);
  const [lastScanTime, setLastScanTime] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null); 
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (dataKaryawan) {
      const timer = setTimeout(() => {
        setDataKaryawan(null);
      }, 10000);
  
      return () => clearTimeout(timer);
    }
  }, [resetKey, dataKaryawan]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        const hasilScan = buffer.trim();
        handleScanRFID(hasilScan);
        setBuffer("");
      } else {
        setBuffer((prev) => prev + e.key);
      }
    };
  
    window.addEventListener("keypress", handleKeyPress);
  
    const currentTimeout = timeoutRef.current;
  
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [buffer]);

  const handleScanRFID = (hasilScan) => {
    setIsLoading(true);
  
    if (dummyData[hasilScan]) {
      setDataKaryawan(dummyData[hasilScan]);
      setLastScanTime(new Date());
      setNotFound(false);
      setIsLoading(false);
      setResetKey((prev) => prev + 1);
    } else {
      setDataKaryawan(null);
      setNotFound(true);
      setIsLoading(false);
  
      setTimeout(() => {
        setNotFound(false);
      }, 10000);
    }
  };

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
        {isLoading ? (
          <LoadingComponent text="Loading..." />
        ) : (
          <>
            {notFound && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 font-semibold animate-pulse">
                ⚠️ Kode tidak ditemukan. Silakan coba lagi.
              </div>
            )}

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
            ) : !notFound && (
              <div className="mt-10">
                <div className="animate-pulse">
                  <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4"></div>
                  <p className="text-red-500 font-semibold">
                    Menunggu kartu RFID...
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
