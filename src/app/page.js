"use client";
import React, { useEffect, useState, useRef } from "react";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import { Hind } from "next/font/google";
import MySlider from "./components/SliderCard/MySlider";
import AboutMe from "./components/AboutMe/AboutMe";
import CallToAction from "./components/CallToAction/CallToAction";
import './globals.css'

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  const [isLoadedText1, setIsLoadedText1] = useState(false);
  const [isLoadedText2, setIsLoadedText2] = useState(false);
  const [isLoadedProjects, setIsLoadedProjects] = useState(false);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1 // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === text1Ref.current) {
            setTimeout(() => {
              setIsLoadedText1(true);
            }, 500);
          } else if (entry.target === text2Ref.current) {
            setTimeout(() => {
              setIsLoadedText2(true);
            }, 1000);
          } else if (entry.target === projectsRef.current) {
            setTimeout(() => {
              setIsLoadedProjects(true);
            }, 2000);
          }
        }
      });
    }, observerOptions);

    if (text1Ref.current) observer.observe(text1Ref.current);
    if (text2Ref.current) observer.observe(text2Ref.current);
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (text1Ref.current) observer.unobserve(text1Ref.current);
      if (text2Ref.current) observer.unobserve(text2Ref.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      <HomeComponent />
      <div id="portfolio" className="mt-0 -mb-40">
        <div className="bg-gradient-dark-inverse">
          <div className="container m-auto pt-20">
            <div className="mt-10">
              <p
                ref={text1Ref}
                className={`fade-in ${isLoadedText1 ? "active" : ""} text-gradient-title md:pl-[80px] px-5 font-extrabold`}
                style={{ paddingTop: "30px" }}
              >
                Latest Projects
              </p>
              <p
                ref={text2Ref}
                className={`fade-in ${isLoadedText2 ? "active" : ""} text-gradient-description max-w-2xl md:pl-[80px] px-5 font-[300] text-[18px] mb-3 leading-8 mt-5 ${hind.className}`}
              >
                Welcome to my portfolio! Here you will find a showcase of my most
                recent work as a web and mobile developer, as well as a music
                producer. Discover innovative projects where I combine technology
                and creativity, developing modern applications and websites.
                Additionally, explore my talent in music production through
                compositions and productions. Immerse yourself in my professional
                and artistic world!
              </p>
            </div>
          </div>
          <div ref={projectsRef} className={`fade-in ${isLoadedProjects ? "active" : ""}`} style={{ paddingBottom: "300px", marginTop: "50px" }}>
            <MySlider />
          </div>
        </div>
      </div>
      <div className="mt-[157px]">
        <AboutMe />
      </div>
      {/* <Testimonial /> */}
      <CallToAction />
    </main>
  );
}
