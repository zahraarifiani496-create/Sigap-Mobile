import React, { createContext, useState } from "react";

export const LaporanContext = createContext();

export const LaporanProvider = ({ children }) => {
  const [laporanList, setLaporanList] = useState([]);

  const tambahLaporan = (laporan) => {
    setLaporanList((prev) => [laporan, ...prev]);
  };

  return (
    <LaporanContext.Provider value={{ laporanList, tambahLaporan }}>
      {children}
    </LaporanContext.Provider>
  );
};