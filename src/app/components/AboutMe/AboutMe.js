"Use client";
import React, { useState, useEffect, useRef } from "react";
import { Hind } from "next/font/google";
import { AboutData } from "@/app/data";
import Image from "next/image";
import translations from "../../translations.json"; // Importar el archivo de traducciones
import { useLanguage } from "../../Context/LanguageContext"; // Importar el hook de idioma

import "./AboutMe.css";
import "../../globals.css";

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AboutMe() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFaded, setIsFaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mapData, setMapData] = useState(AboutData[0]);
  const { language, setLanguage } = useLanguage(); // Usar el idioma global del contexto

  const myFunctions = (data) => {
    setIsFlipped(false);
    setIsFaded(false);
    setMapData(data);
  };

  const handleCardClick = (data, index) => {
    setIsFlipped(true);
    setIsFaded(true);
    setSelectedIndex(index);

    setTimeout(() => myFunctions(data), 600);
  };

  const HandleNext = () => {
    if (selectedIndex < 5) {
      handleCardClick(AboutData[selectedIndex + 1], selectedIndex + 1);
    } else {
      handleCardClick(AboutData[0], 0);
    }
  };

  const HandlePrev = () => {
    if (selectedIndex !== 0) {
      handleCardClick(AboutData[selectedIndex - 1], selectedIndex - 1);
    } else {
      handleCardClick(AboutData[5], 5);
    }
  };

  const [isLoadedText1, setIsLoadedText1] = useState(false);
  const [isLoadedText2, setIsLoadedText2] = useState(false);
  const [isLoadedText3, setIsLoadedText3] = useState(false);
  const [isLoadedCards, setIsLoadedCards] = useState(false);
  const [isLoadedSkills, setIsLoadedSkills] = useState(false);

  const aboutMeRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsLoadedText1(true), 400);
            setTimeout(() => setIsLoadedText2(true), 600);
            setTimeout(() => setIsLoadedText3(true), 800);
            setTimeout(() => setIsLoadedCards(true), 1000);
            setTimeout(() => setIsLoadedSkills(true), 1200);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutMeRef.current) {
      observer.observe(aboutMeRef.current);
    }

    return () => {
      if (aboutMeRef.current) {
        observer.unobserve(aboutMeRef.current);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <div className="bg-gradient-dark">
        <div id="about-me-component" ref={aboutMeRef}>
          <div className="pt-[250px] mt-4 pb-[100px] lg:pb-[600px] relative lg:h-[800px]">
            <div className="container m-auto mt-10">
              <h1
                className={`fade-in ${
                  isLoadedText1 ? "active" : ""
                } relative font-recoletaBlack text-5xl text-gradient-title mb-5 -mt-40 md:px-24 px-5`}
              >
                {translations[language].aboutme.title}
              </h1>
              <h4
                className={`fade-in ${
                  isLoadedText2 ? "active" : ""
                } text-gradient relative w-full font-[300] md:w-3/4 lg:w-2/3 xl:w-1/2 font-recoleta text-2xl mb-10 px-5 md:px-24`}
              >
                {translations[language].aboutme.subtitle}
              </h4>
              <section
                className={`fade-in ${
                  isLoadedText3 ? "active" : ""
                } relative flex flex-col lg:flex-row px-5 md:px-24`}
              >
                <p
                  className={`w-full lg:w-1/3 text-gradient-description mr-0 mb-5 lg:mr-4 font-[200] ${hind.className}`}
                >
                  {translations[language].aboutme.text1}
                </p>
                <p
                  className={`w-full lg:w-1/3 text-gradient-description mr-0 mb-5 lg:mr-4 font-[200] ${hind.className}`}
                >
                  {translations[language].aboutme.text2}
                </p>
                <p
                  className={`w-full lg:w-1/3 text-gradient-description mr-0 mb-5 lg:mr-4 font-[200] ${hind.className}`}
                >
                  {translations[language].aboutme.text3}
                </p>
              </section>
            </div>
          </div>

          <div className="lg:-mt-60">
            <section className="container flex flex-col m-auto sm:flex-row px-5 md:px-24 mt-[50px sm:mt-0] transform translate-y-[-100px]">
              <div className="hidden sm:flex w-full sm:w-1/2 lg:w-7/12">
                <div
                  className={`fade-in ${
                    isLoadedCards ? "active" : ""
                  } grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mr-0 lg:mr-10`}
                >
                  {AboutData.map((item, index) => (
                    <a
                      key={index}
                      onClick={() => handleCardClick(item, index)}
                      style={{
                        boxShadow: "-8px -8px 8px #00bcd4, 8px 8px 8px #e91e63",
                      }}
                      className={`relative cursor-pointer transition-all transform duration-300 group rounded-xl center p-6 lg:p-10 flex flex-col justify-center items-center ${
                        selectedIndex == index
                          ? " -translate-y-2 bg-[#181818]"
                          : "hover:bg-[#476571] hover:shadow-xl hover:-translate-y-2 bg-white"
                      }`}
                    >
                      <div className="w-16 h-16 sm:w-10 sm:h-10 lg:w-16 lg:h-16">
                        <Image
                          height={100}
                          width={100}
                          src={item.img}
                          alt="internet issues"
                        />
                      </div>
                      <h4
                        className={`text-center text-sm lg:text-xl font-recoletaBold transition-colors duration-500 group-hover:text-white text-[#000000] mt-3 ${
                          selectedIndex === index ? "text-white" : ""
                        }`}
                      >
                        {item.title}
                      </h4>
                      <div
                        className={`absolute -top-2 -right-2 transform transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-xl w-12 h-12 rounded-lg bg-[#476571] flex justify-center items-center font-bold text-white font-recoletaBold text-xl ${
                          selectedIndex === index
                            ? "opacity-100 rotate-12"
                            : "group-hover:rotate-12"
                        }`}
                      >
                        {item.count}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-5/12 overflow-visible px-0 sm:pl-6 xl:px-10">
                <div
                  id="cardskill"
                  className={`fade-in ${
                    isLoadedSkills ? "active" : ""
                  } lg:mt-0 mt-10 rounded-xl shadow-accent-color relative`}
                >
                  <div className="card-skills">
                    <div className="card-content p-10 xl:p-12">
                      <section
                        className={`fade-left overflow-hidden ${
                          isFaded ? "fade-out" : ""
                        }`}
                      >
                        <p
                          className={`text-xs sm:text-sm text-[#fff] md:text-lg lg:text-xl ${hind.className} ml-10 transition duration-500 transform opacity-100`}
                        >
                          {translations[language].aboutme.skillsTitle}
                        </p>
                        <h2 className="font-recoletaBold text-[#00bcd4] ml-10 text-2xl md:text-3xl lg:text-3xl mb-6 w-36 md:w-44 lg:w-56 transition duration-500 transform opacity-100 undefined undefined">
                          {mapData?.title}
                        </h2>
                        <ul
                          className={`${hind.className} font-bold list-disc text-[#00000] ml-8 lg:ml-10 text-base lg:text-lg transition duration-500 transform opacity-100 undefined undefined`}
                        >
                          {mapData?.array?.map((obj) => (
                            <li key={obj} className="mb-2 text-white">
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </section>
                      <div
                        className={`absolute perspective-500 -top-7 sm:top-30 right-0 sm:-right-20 AboutMeCard ${
                          isFlipped ? "flipped" : ""
                        }`}
                      >
                        <div className="AboutMeCard-inner">
                          <div className="rounded-2xl cursor-pointer text-7xl xl:text-9xl font-recoletaBlack text-white bg-gradient p-5 xl:p-8 w-28 h-28 xl:w-48 xl:h-48 transform transition duration-500 transform-preserve -rotate-6 transform-preserve">
                            <span className="text-2xl xl:text-6xl mr-2 sm:mr-3">
                              *
                            </span>
                            {mapData.count}
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-10 -bottom-5 flex">
                        <a
                          onClick={HandlePrev}
                          className="w-12 h-12 rounded-xl mr-1 transform transition duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-lg -rotate flex justify-center items-center bg-[#00bcd4]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            ></path>
                          </svg>
                        </a>
                        <a
                          onClick={HandleNext}
                          className="w-12 h-12 rounded-xl mr-1 transform transition duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-lg -rotate flex justify-center items-center bg-[#00bcd4]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
