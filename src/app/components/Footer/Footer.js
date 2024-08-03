"use client";
import React, { useState, useEffect, useRef } from "react";
import Accordian from "./Accordian";
import VisitorCounter from "../VisitorCounter/VisitorCounter";
import VaderComponent from "./VaderComponent";
import "./vader.css";
import "./darkside.css";

export default function Footer() {
  const service = [
    " 1-on-1 Coaching",
    "Company Review",
    "Accounts Review",
    "HR Consulting",
    "SEO Optimization",
  ];
  const company = ["About", "Meet the Team", "Accounts Review"];
  const helping = ["Contact", "FAQs", "Live Chat"];
  const legal = [
    "Accessibility",
    "Returns Policy",
    "Refund Policy",
    " Hiring Statistics",
  ];

  const [isCardVisible, setIsCardVisible] = useState(false);
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
    document.body.style.overflow = isCardVisible ? "auto" : "hidden"; // Prevent scrolling when the card is visible
  };

  const [isLoadedTitle, setIsLoadedTitle] = useState(false);
  const [isLoadedVader, setIsLoadedVader] = useState(false);
  const [isLoadedText1, setIsLoadedText1] = useState(false);
  const [isLoadedText2, setIsLoadedText2] = useState(false);
  const [isLoadedVisitor, setIsLoadedVisitor] = useState(false);
  const [isLoadedText3, setIsLoadedText3] = useState(false);
  const [isLoadedSocialMedias, setIsLoadedSocialMedias] = useState(false);

  const titleRef = useRef(null);
  const vaderRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const visitorRef = useRef(null);
  const text3Ref = useRef(null);
  const socialMediasRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target) {
            case titleRef.current:
              setIsLoadedTitle(true);
              observer.unobserve(entry.target);
              break;
            case vaderRef.current:
              setIsLoadedVader(true);
              observer.unobserve(entry.target);
              break;
            case text1Ref.current:
              setIsLoadedText1(true);
              observer.unobserve(entry.target);
              break;
            case text2Ref.current:
              setIsLoadedText2(true);
              observer.unobserve(entry.target);
              break;
            case visitorRef.current:
              setIsLoadedVisitor(true);
              observer.unobserve(entry.target);
              break;
            case text3Ref.current:
              setIsLoadedText3(true);
              observer.unobserve(entry.target);
              break;
            case socialMediasRef.current:
              setIsLoadedSocialMedias(true);
              observer.unobserve(entry.target);
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (vaderRef.current) observer.observe(vaderRef.current);
    if (text1Ref.current) observer.observe(text1Ref.current);
    if (text2Ref.current) observer.observe(text2Ref.current);
    if (visitorRef.current) observer.observe(visitorRef.current);
    if (text3Ref.current) observer.observe(text3Ref.current);
    if (socialMediasRef.current) observer.observe(socialMediasRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (vaderRef.current) observer.unobserve(vaderRef.current);
      if (text1Ref.current) observer.unobserve(text1Ref.current);
      if (text2Ref.current) observer.unobserve(text2Ref.current);
      if (visitorRef.current) observer.unobserve(visitorRef.current);
      if (text3Ref.current) observer.unobserve(text3Ref.current);
      if (socialMediasRef.current) observer.unobserve(socialMediasRef.current);
    };
  }, []);

  useEffect(() => {
    // Función para mostrar los fireflies solo dentro del footer
    const showFireflies = () => {
      const footer = document.getElementById("Footer");
      if (footer) {
        const fireflies = footer.querySelectorAll(".firefly");
        fireflies.forEach((firefly) => {
          firefly.style.display = "block"; // Mostrar fireflies
        });
      }
    };

    showFireflies(); // Llamar a la función al cargar el componente

    // Limpiar al desmontar el componente para evitar fugas de memoria
    return () => {
      const footer = document.getElementById("Footer");
      if (footer) {
        const fireflies = footer.querySelectorAll(".firefly");
        fireflies.forEach((firefly) => {
          firefly.style.display = "none"; // Ocultar fireflies
        });
      }
    };
  }, []);

  return (
    <footer className="relative" id="Footer">
      <div className="firefly-container absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
        {/* Imagen de fondo */}
        <img
          src="/mustafar.jpg"
          alt="Background"
          className="w-full h-full object-cover shadow-top "
          style={{
            objectPosition: "center",
            pointerEvents: "none",
            opacity: "95%",
          }}
        />

        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
      </div>

      {/* Contenido del footer */}
      <div className="relative z-10">
        <div className="flex justify-center pt-20">
          <button
            ref={titleRef}
            className={`fade-in btn ${isLoadedTitle ? "active" : ""} `}
          >
            <span className="strong ">
              You don't know the power of the dark side...
            </span>
            <div id="container-stars">
              <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </button>
        </div>
        <div
          id="vader"
          ref={vaderRef}
          className={`fade-in ${
            isLoadedVader ? "active" : ""
          } flex justify-center pt-20`}
        >
          <VaderComponent className="" />
        </div>
        <div
          className="max-w-[1000px] bg-[#1c211ec4] rounded-xl px-[20px] sm:px-[64px] py-[64px] m-auto"
          style={{ transform: "translate(0px, 100px)" }}
        >
          <p
            ref={text1Ref}
            className={`fade-in ${
              isLoadedText1 ? "active" : ""
            } text-[#e91e63] flex justify-center font-extra-bold uppercase text-4xl`}
          >
            Visitors
          </p>
          <p
            ref={text2Ref}
            className={`fade-in ${
              isLoadedText2 ? "active" : ""
            } text-gradient-description flex justify-center text-1xl`}
          >
            Check my Nextjs/Firebase visitor component!
          </p>
          <div className="flex justify-center lg:justify-center w-full">
            <div className="w-full lg:w-[80%]">
              <div
                ref={visitorRef}
                className={`fade-in ${
                  isLoadedVisitor ? "active" : ""
                } flex flex-col lg:flex-row items-center justify-center`}
              >
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8 mt-20">
          <div className="xl:max-w-6xl 2xl:max-w-7xl px-10 md:px-20 xl:px-44 mx-auto sm:py-10 overflow-hidden">
            <p
              ref={text3Ref}
              className={`fade-in ${
                isLoadedText3 ? "active" : ""
              } text-[#00bcd4] flex justify-center text-2xl mb-3`}
            >
              Follow Me Around
            </p>
            <div
              ref={socialMediasRef}
              className={`fade-in ${
                isLoadedSocialMedias ? "active" : ""
              } flex flex-wrap justify-center items-center`}
            >
              <div className="w-1/4 sm:w-auto sm:mx-10 mb-6 sm:mb-0">
                <a
                  className="group flex flex-col items-center justify-center"
                  target="_blank"
                  href="https://github.com/Ali-Morgoth"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 496 512"
                    className="w-8 h-8 text-gray-300 transition-colors duration-300 group-hover:text-[#00bcd4]"
                    height="40px"
                    width="40px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  <h5 className="font-recoleta mt-1 lg:mt-2 xl:mt-3 text-sm sm:text-base font-sans text-gray-200 transition-colors duration-300 group-hover:text-[#00bcd4]">
                    Git Hub
                  </h5>
                </a>
              </div>

              <div className="w-1/4 sm:w-auto sm:mx-10 mb-6 sm:mb-0">
                <a
                  className="group flex flex-col items-center justify-center"
                  target="_blank"
                  href="https://www.youtube.com/channel/UCuRE9d41HODLJExP0qC7m_g"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    className="w-8 h-8 text-gray-300 transition-colors duration-300 group-hover:text-[#00bcd4]"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    height="40px"
                    width="40px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.782-42.152-48.433-48.433C464.335 64 288 64 288 64s-176.335 0-213.222 11.65c-23.65 6.281-42.152 24.783-48.433 48.433C16 160.97 16 256 16 256s0 95.03 10.345 131.917c6.281 23.65 24.783 42.152 48.433 48.433C111.665 448 288 448 288 448s176.335 0 213.222-11.65c23.65-6.281 42.152-24.783 48.433-48.433C560 351.03 560 256 560 256s0-95.03-10.345-131.917zM232 334V178l142 78-142 78z"></path>
                  </svg>
                  <h5 className="font-recoleta mt-1 lg:mt-2 xl:mt-3 text-sm sm:text-base font-sans text-gray-200 transition-colors duration-300 group-hover:text-[#00bcd4]">
                    Youtube
                  </h5>
                </a>
              </div>

              <div className="w-1/4 sm:w-auto sm:mx-10 mb-6 sm:mb-0">
                <a
                  className="group flex flex-col items-center justify-center"
                  target="_blank"
                  href="https://www.linkedin.com/in/alian-andahur-91765a29b/"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="w-8 h-8 text-gray-300 transition-colors duration-300 group-hover:text-[#00bcd4]"
                    height="40px"
                    width="40px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                  </svg>
                  <h5 className="font-recoleta mt-1 lg:mt-2 xl:mt-3 text-sm sm:text-base font-sans text-gray-200 transition-colors duration-300 group-hover:text-[#00bcd4]">
                    Linkedin
                  </h5>
                </a>
              </div>
            </div>
            <div className="mt-4 justify-center flex text-[#fff] text-xs md:text-base">
              <p>© 2024 Alian Andahur. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
