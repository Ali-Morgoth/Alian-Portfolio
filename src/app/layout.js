
// import LocalFont from '@next/font/local'
// import "./globals.css";
// import Header from '../app/components/Header/Header';
// import Footer from './components/Footer/Footer';

// const poppins = LocalFont({
//   src: [
//     {
//       path: "../../public/fonts/Recoleta-Black.ttf",
//       weight: "400",
//     },
//     {
//       path: "../../public/fonts/Recoleta-Medium.ttf",
//       weight: "300",
//     },
//     {
//       path: "../../public/fonts/Recoleta-Light.ttf",
//       weight: "200",
//     },
//   ],
//   variable: "--font-Recoleta-Black",
// });

// export const metadata = {
//   title: "Alian Andahur",
//   description: "Discover my digital and musical skills",
// };



//  export default function RootLayout({ children }) {
//    return (
//      <html lang="en">
//        <body className={poppins.className}>
//         <Header/>
//         {children}
//         <Footer/>
//         </body>
//      </html>
//    );
//  }


// src/app/layout.js
import "./globals.css";
import ClientLayout from './ClientLayout';
import { LoadingProvider } from '../app/Context/LoadingContext';

export const metadata = {
  title: "Alian Andahur",
  description: "Discover my digital and musical skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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


