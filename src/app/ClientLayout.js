// src/app/ClientLayout.js
"use client";

import LocalFont from '@next/font/local';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { useLoading } from '../app/Context/LoadingContext';

const poppins = LocalFont({
  src: [
    {
      path: "../../public/fonts/Recoleta-Black.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Recoleta-Medium.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Recoleta-Light.ttf",
      weight: "200",
    },
  ],
  variable: "--font-Recoleta-Black",
});

export default function ClientLayout({ children }) {
  const { loading } = useLoading();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={poppins.className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
