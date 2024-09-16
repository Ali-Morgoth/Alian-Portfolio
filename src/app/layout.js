// src/app/layout.js
import "./globals.css";
import ClientLayout from './ClientLayout';
import { LoadingProvider } from '../app/Context/LoadingContext';
import Head from 'next/head';
import { LanguageProvider } from '../app/Context/LanguageContext'; // Importa el LanguageProvider


export const metadata = {
  title: "Alian Andahur | Full Stack Developer & Music Producer",
  description: "Portfolio of Alian Andahur - Full Stack Developer, Music Producer, and Cybersecurity Enthusiast. Explore my digital and musical projects.",
};

export default function RootLayout({ children }) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alian Andahur",
    "url": "https://alian-andahur.vercel.app/",
    "image": "https://alian-andahur.vercel.app/PerfilTitulo.webp",  // Ruta de la imagen de perfil
    "jobTitle": "Full Stack Developer & Musician",
    "description": "Web developer with a passion for music, specializing in React, Next.js, and music production.",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://www.linkedin.com/in/alian-andahur/",
      "https://github.com/alian-andahur"
    ]
  };

  return (
    <html lang="en" translate="no"> {/* Evita la traducción automática */}
      <Head>
        <meta name="google" content="notranslate" /> {/* Para Google */}
        <meta name="robots" content="notranslate" /> {/* Para otros motores de búsqueda */}
        <meta name="description" content="Discover the digital and musical skills of Alian Andahur, a web developer, musician, and full-stack developer." />
        <meta name="keywords" content="Alian Andahur, web developer, musician, full-stack developer, React, Next.js, Chile" />
        <meta name="author" content="Alian Andahur" />
        <meta property="og:title" content="Alian Andahur - Web Developer & Musician" />
        <meta property="og:description" content="Discover my digital and musical skills as a web developer and musician." />
        <meta property="og:image" content="/PerfilTitulo.webp" /> {/* Ajustar la ruta de la imagen */}
        <meta property="og:url" content="https://alian-andahur.vercel.app/" />

          {/* Rich Snippets - JSON-LD */}
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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


