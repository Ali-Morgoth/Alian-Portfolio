// src/app/layout.js
import "./globals.css";
import ClientLayout from './ClientLayout';
import { LoadingProvider } from '../app/Context/LoadingContext';
import Head from 'next/head';
import { LanguageProvider } from '../app/Context/LanguageContext'; // Importa el LanguageProvider


export const metadata = {
  title: "Alian Andahur",
  description: "Discover my digital and musical skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no"> {/* Evita la traducción automática */}
      <Head>
        <meta name="google" content="notranslate" /> {/* Para Google */}
        <meta name="robots" content="notranslate" /> {/* Para otros motores de búsqueda */}
      </Head>
      <body>
        <LoadingProvider>
          <LanguageProvider> {/* Envuelve el contenido en LanguageProvider */}
            <ClientLayout>
              <div translate="no"> {/* Evita la traducción automática en este contenido */}
                {children}
              </div>
            </ClientLayout>
          </LanguageProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}


