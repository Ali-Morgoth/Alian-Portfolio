
// src/app/layout.js
// import "./globals.css";
// import ClientLayout from './ClientLayout';
// import { LoadingProvider } from '../app/Context/LoadingContext';

// export const metadata = {
//   title: "Alian Andahur",
//   description: "Discover my digital and musical skills",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <LoadingProvider>
//           <ClientLayout>
//             {children}
//           </ClientLayout>
//         </LoadingProvider>
//       </body>
//     </html>
//   );
// }

// src/app/layout.js
import "./globals.css";
import ClientLayout from './ClientLayout';
import { LoadingProvider } from '../app/Context/LoadingContext';
import Head from 'next/head'; // Importa el componente Head

export const metadata = {
  title: "Alian Andahur",
  description: "Discover my digital and musical skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body>
        <LoadingProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}



