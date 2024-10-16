"use client";

import React, { useEffect, useState } from "react";
import Drawer from "./DiagonalDrawer";
import "../Header/DiagonalDrawer.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import translations from "../../translations.json"; // Importar el archivo de traducciones
import { useLanguage } from "../../Context/LanguageContext"; // Importar el hook de idioma
import { firestore } from "../../lib/firebase"; // Importar la configuración de Firestore
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"; // Importar funciones de Firestore
import "../../globals.css";
import { AiFillHeart } from "react-icons/ai"; // Importar ícono de corazón

export default function Header() {
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadedMenu, setIsLoadedMenu] = useState(false);
  const { language, setLanguage } = useLanguage(); // Usar el idioma global del contexto
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedMenu(true);
    }, 200);
  }, []);

  const handleNavigation = (index, href) => {
    setSelectedIndex1(index);
    router.push(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para cambiar idioma
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);
  };

  //funcion para boton de likes
  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(firestore, "LikesList", "1lYR1Th3pvtIku333VDG");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLikes(docSnap.data().LikesCount);
      }
    };
    fetchLikes();

    const lastLiked = localStorage.getItem("lastLiked");
    if (lastLiked && new Date().getTime() - lastLiked < 86400000) {
      setHasLiked(true);
    }
  }, []);

  const handleLike = async () => {
    if (!hasLiked) {
      setHasLiked(true);
      localStorage.setItem("lastLiked", new Date().getTime());

      const docRef = doc(firestore, "LikesList", "1lYR1Th3pvtIku333VDG");
      await updateDoc(docRef, {
        LikesCount: increment(1),
      });

      setLikes(likes + 1);
    }
  };

  return (
    <React.Fragment>
      <div className={`diagonal-drawer ${isOpen ? "open" : ""}`}>
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedIndex1={selectedIndex1}
          setSelectedIndex1={setSelectedIndex1}
        />
      </div>
      {/* <header
        className={`${
          isScrolled ? "headerShow" : ""
        } w-full fixed top-0 z-50 transition-all duration-500`}
        style={{
          backgroundColor: isScrolled ? "#1f1f1f" : "transparent",
          boxShadow: isScrolled ? "#00bcd4 -10px 15px 20px 10px" : "",
        }}
      > */}
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          isScrolled ? "header-scrolled" : ""
        }`}
        style={{
          width: "100%",
          maxWidth: "100vw", // Asegura que el ancho del header no exceda el tamaño de la ventana
          boxSizing: "border-box", // Asegura que el padding y borde no afecten el tamaño total
          backgroundColor: isScrolled ? "#1f1f1f" : "transparent",
          boxShadow: isScrolled
            ? "0px -10px 15px 20px rgba(0, 188, 212, 0.5)"
            : "",
        
        }}
      >
        <div className="relative">
          <div
            onClick={() => setIsOpen(true)}
            className="z-30 absolute cursor-pointer w-14 h-14 lg:w-24 lg:h-24 flex justify-center items-center rounded-br-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="hamburger">
                <div className="hamburger-inner"></div>
              </div>
              <div className="hamburger">
                <div className="hamburger-inner"></div>
              </div>
              <div className="hamburger">
                <div className="hamburger-inner"></div>
              </div>
            </div>
          </div>
        </div>

        <nav
          className={`fade-in ${
            isLoadedMenu ? "active" : ""
          } invisible xl:visible xl:max-w-4xl 2xl:max-w-7xl mx-auto`}
        >
          <ul className="flex font-recoletaBlack flex-row items-center h-24">
            <li className="group text-2xl relative font-bold mr-20">
              {selectedIndex1 === 0 ? (
                <span className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              ) : (
                <span className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              )}
              <a
                className={`menu-item text-gradient-menu ${
                  selectedIndex1 === 0 ? "text-[#DABF28]" : ""
                } group-hover:text-[#DABF28]`}
                onClick={() => handleNavigation(0, "/#home")}
              >
                {translations[language].header.home}
              </a>
            </li>
            <li className="group text-2xl relative font-bold mr-20">
              {selectedIndex1 === 1 ? (
                <span className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              ) : (
                <span className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              )}
              <a
                className={`menu-item text-gradient-menu ${
                  selectedIndex1 === 1 ? "text-[#DABF28]" : ""
                } group-hover:text-[#DABF28]`}
                onClick={() => handleNavigation(1, "/#portfolio")}
              >
                {translations[language].header.portfolio}
              </a>
            </li>
            <li className="group text-2xl relative font-bold mr-20">
              {selectedIndex1 === 2 ? (
                <span className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              ) : (
                <span className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              )}
              <a
                className={`menu-item text-gradient-menu ${
                  selectedIndex1 === 2 ? "text-[#DABF28]" : ""
                } group-hover:text-[#DABF28]`}
                onClick={() => handleNavigation(2, "/#about-me-component")}
              >
                {translations[language].header.about_me}
              </a>
            </li>
            <li className="group text-2xl relative font-bold mr-20">
              {selectedIndex1 === 3 ? (
                <span className="menu-effect transform opacity-100 -rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              ) : (
                <span className="menu-effect transform opacity-0 rotate-12 group-hover:-rotate-12 group-hover:opacity-100"></span>
              )}
              <Link
                className={`menu-item text-gradient-menu ${
                  selectedIndex1 === 3 ? "text-[#DABF28]" : ""
                } group-hover:text-[#DABF28]`}
                href="/page/contactme"
                onClick={() => handleNavigation(3, "/page/contactme")}
              >
                {translations[language].header.hire_me}
              </Link>
            </li>
          </ul>
        </nav>
        {/* Botón de idioma y likes */}
        <div className="absolute top-2 right-4 z-50 lg:mt-4 flex items-center space-x-4">
          {/* Botón de likes */}
          <div className="text-white mr-12 flex items-center">
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className="flex items-center space-x-2"
            >
              <AiFillHeart
                className={`text-2xl ${
                  hasLiked ? "text-red-600" : "text-white"
                }`}
              />
              <span className="text-1xl text-[#00bcd4]">{likes}</span>
            </button>
          </div>

          {/* Botón de idioma */}
          <button
            id="language"
            className="custom-button"
            onClick={toggleLanguage}
          >
            {translations[language].header.language}
          </button>
        </div>
      </header>
    </React.Fragment>
  );
}
