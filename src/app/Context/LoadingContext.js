"use client"
// src/app/context/LoadingContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firstVisit = localStorage.getItem('isFirstVisit');
    if (!firstVisit) {
      localStorage.setItem('isFirstVisit', 'true');
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Ajusta el tiempo de carga según sea necesario
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
