import React, { useEffect, useState } from "react";
import { Hind } from "next/font/google";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowCircleDown } from "react-icons/hi";
import "../../globals.css";
import translations from '../../translations.json'; // Importar el archivo de traducciones
import { useLanguage } from '../../Context/LanguageContext';

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function HomeComponent() {
  var settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 2000,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1760,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isLoadedText1, setIsLoadedText1] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const [isLoadedText2, setIsLoadedText2] = useState(false);
  const [isLoadedBtn1, setIsLoadedBtn1] = useState(false);
  const [isLoadedBtn2, setIsLoadedBtn2] = useState(false);
  const [isLoadedProfilePic, setIsLoadedProfilePic] = useState(false);
  const [isLoadedSlider, setIsLoadedSlider] = useState(false);

  const { language } = useLanguage(); // Obtener el idioma desde el contexto

  useEffect(() => {
    // Simulando una carga asincrónica (puedes ajustar según tu lógica de carga)
    setTimeout(() => {
      setIsLoadedText1(true);
    }, 500); // Por ejemplo, 1000ms de retraso para simular carga
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedImage(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedText2(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedBtn1(true);
    }, 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedBtn2(true);
    }, 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedProfilePic(true);
    }, 1200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedSlider(true);
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <div
        id="home"
        className="bg-gradient-dark"
        // style={{
        //   backgroundImage:
        //     "linear-gradient(to bottom, #0b0c10, #1f1f1f)",
        //   minHeight: "500px",
        //   maxHeight: "1200px",
        //   height: "100%",
        //   width: "100%",
        //   text-[#00D5A4]
        // }}
      >
        <div className="container m-auto">
          <div className="grid grid-cols-12">
            <div className=" flex flex-col justify-center col-span-12 md:col-span-5 md:bg-transparent">
              <div className="container m-auto">
                <div className="lg:pl-24 sm:pl-10 pl-0 py-20 md:py-0 md:text-start text-center ">
                  <p
                    className={`fade-in ${
                      isLoadedText1 ? "active" : ""
                    } text-gradient mb-3 text-3xl md:text-base lg:text-2x1 pb-5 text-center lg:text-3xl ${
                      hind.className
                    }`}
                  >
                   {translations[language].home.greeting}
                  </p>

                  <div
                    className={`fade-in ${
                      isLoadedImage ? "active" : ""
                    } flex items-center mt-[-40px] mb-3 `}
                  >
                    <img
                      src="/PerfilTitulo.png"
                      decoding="async"
                      className="ml-0" // Margen izquierdo para separar el h1 de la imagen
                      alt="TituloPerfil"
                    />
                  </div>
                  <h2
                    className={`fade-in ${
                      isLoadedText2 ? "active" : ""
                    } text-gradient py-2 font-bold uppercase md:text-xl mt-[-30px] ${
                      hind.className
                    }`}
                  >
                     {translations[language].home.role}
                  </h2>

                  {/* <!-- Contenedor para alinear los botones horizontalmente --> */}
                  <div className="flex justify-center mt-8 space-x-4 md:mt-5 xl:mt-10">
                    <a
                      href="/#portfolio"
                      className={`fade-in text-xs ${
                        isLoadedBtn1 ? "active" : ""
                      }  cursor-pointer inline-block bg-[#00bcd4] transition-all duration-300 ease-in-out rounded-lg text-white py-3 px-5 font-bold uppercase md:py-2 lg:py-3 lg:px-8 md:text-xs lg:text-xs hover:bg-[#000000] hover:show-lg transform hover:translate-y-1 button ${
                        hind.className
                      }`}
                    >
                       {translations[language].home.projects_button}
                    </a>
                    <a
                      href="cv_alian.pdf"
                      download="cv_alian.pdf"
                      className={`fade-in ${
                        isLoadedBtn2 ? "active" : ""
                      } cursor-pointer inline-block bg-[#e91e63] transition-all duration-300 ease-in-out rounded-lg text-white py-3 px-8 lg:px-10 font-bold uppercase md:py-2 lg:py-3 md:text-xs lg:text-base hover:bg-[#000000] hover:show-lg transform hover:translate-y-1 button ${
                        hind.className
                      }`}
                    >
                      <span className="flex items-center text-xs">
                      {translations[language].home.resume_button}
                        <HiArrowCircleDown className="ml-2" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 col-span-12 md:pt-[130px] pt-[50px] md:bg-transparent">
              <div
                className={`fade-in ${
                  isLoadedProfilePic ? "active" : ""
                } container m-auto`}
              >
                <img
                  src="/perfil3.png"
                  decoding="async"
                  alt="profile pics"
                  className="w-full h-auto mt-[-150px]"
                  style={{
                    WebKitMaskImage: "linear-gradient(black, transparent)",
                    maskImage: "linear-gradient(black 50%, transparent)",
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div className="container m-auto absolute">
            <div className={`fade-in ${isLoadedSlider ? "active" : ""} px-3`}>
              <div
                className="relative max-w-sm bottom-[70px] lg:bottom-[132px] md:max-w-5xl xl:max-w-6x1 px-5 lg:px-14 overflow-auto mx-auto bg-white rounded-2xl z-20"
                style={{
                  boxShadow: "-8px -8px 8px #00bcd4, 8px 8px 8px #e91e63",
                }}
              >
                <div className="lg:py-10 md:py-6 sm:py-6 cursor-all-scroll">
                  <Slider {...settings}>
                    <img src="/filmora.avif" alt="filmora" className="h-12" />
                    <img src="/reactjs.png" alt="reactjs" className="h-12" />
                    <img src="/nextjs.png" alt="nextjs" className="h-12" />
                    <img
                      src="/studioone.jpg"
                      alt="studioone"
                      className="h-12"
                    />
                    <img
                      src="/expressjs.png"
                      alt="expressjs"
                      className="h-12"
                    />
                    <img src="/nodejs.png" alt="nodejs" className="h-12" />
                    <img src="/hacker.png" alt="hacker" className="h-12" />
                    <img
                      src="/react_native.png"
                      alt="reactnative"
                      className="h-12"
                    />
                    <img
                      src="/metasploit.png"
                      alt="metasploit"
                      className="h-12"
                    />
                    <img src="/kali.png" alt="kali" className="h-12" />
                    <img src="/aws.webp" alt="aws" className="h-12" />
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
