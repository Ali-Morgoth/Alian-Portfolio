"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hind } from "next/font/google";
import Image from "next/image";

import CountriesList from "@/app/components/CountriesList/CountriesList"; // Corregir la ruta
import CitiesList from "@/app/components/CitiesList/CitiesList"; // Corregir la ruta
import { getGeolocation } from "@/app/api/getGeolocation";
import { registerVisit } from "@/app/api/registerVisit";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Card1 from "@/app/components/Card/Card1";
import WorldMap from "@/app/components/WorldMap/WorldMap";

import { FaYoutube } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import Testimonials from "@/app/components/Testimonial/Testimonials";

// Registrar el locale inglés para i18n-iso-countries
countries.registerLocale(enLocale);

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Index({ id, data, DataArray }) {
  const router = useRouter();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  useEffect(() => {
    if (JSON.parse(id) === DataArray.length - 1) {
      setNext(0);
    } else {
      setNext(JSON.parse(id) + 1);
    }
    if (JSON.parse(id) === 0) {
      setPrev(DataArray.length - 1);
    } else {
      setPrev(JSON.parse(id) - 1);
    }
  }, [DataArray.length, id]);

  useEffect(() => {
    const logVisit = async () => {
      const geoData = await getGeolocation();
      await registerVisit(geoData);
    };

    logVisit();
  }, []);


   // Filter images to exclude testimonial.webp
   const filteredImages = data?.images.filter(image => image !== "/testimonial.webp");

  return (
    <React.Fragment>
      <div className="relative bg-gradient-dark">
        <Image
          src={data?.images[0]}
          alt="bg photo"
          className="h-[400px] lg:mt-24 sm:mt-0 object-fill"
          width={0}
          height={20}
          sizes="100vw"
          style={{
            width: "100%",
            backgroundSize: "cover",
            filter: "blur(2px)",
          }} // optional
        />
        <div className=" absolute top-0 left-0 w-full h-full z-20 border-t border-gray-300 bg-black bg-opacity-70"></div>
      </div>

      <div className="absolute z-30 top-[220px] sm:top-[200px] sm:left-[65px] justify-center items-center w-full px-10 sm:w-3/4 xl:w-1/2 sm:px-0 sm:text-left">
        <div className="container m-auto">
          <div className="max-w-[650px] w-[100%] m-auto">
            <p className="opacity-3 sm:text-left text-center font-sans text-[#fff] mt-20 lg:mt-10 md:-mt-10 text-lg sm:text-xl">
              Project Sample
            </p>
            <h1 className="opacity-3 text-gradient-title-project sm:text-left text-center w-full sm:w-3/4  text-5xl md:text-5xl lg:text-5xl xl:text-5xl sm:text-4xl">
              {data?.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gradient-dark-inverse grid grid-cols-12 relative space-x-0 lg:space-x-8">
        <div className="container col-span-12 lg:col-span-8 mb-20 scrol lg:px-0 sm:px-20 ">
          {/* Render for geolocation project */}
          {data?.title === "Visitor Statistics Project" ? (
            <div className="w-full max-w-2xl mx-auto my-10 lg:mx-60">
              <div className="w-full lg:w-auto lg:transform lg:translate-x-[-70px]">
                <WorldMap />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="m-4 md:pt-8">
                  <Card1>
                    <div>
                      <CountriesList />
                    </div>
                  </Card1>
                </div>

                <div className="m-4 md:pt-8">
                  <Card1>
                    <CitiesList />
                  </Card1>
                </div>
              </div>

             {/* CSS personalizado para centrar verticalmente en pantallas pequeñas */}
             <style jsx>{`
                .grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 1rem;
                }

                .m-4 {
                  margin-bottom: 2rem;
                }

                @media (max-width: 768px) {
                  .grid {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }

                  .md\:pt-8 {
                    padding-top: 0;
                  }
                }
              `}</style>
            </div>
          ) : (
            filteredImages.map((item) => (
              <div
                key={item}
                className="flex justify-center lg:justify-end items-center"
              >
                <Image
                  src={item}
                  alt="portfolio photos"
                  height={100}
                  width={800}
                  className="mt-20 rounded-lg gradient-border"
                />
              </div>
            ))
          )}

             {/* Render for testimonial project */}
             {data.title === "Testimonial - my own project sample" && (
              <div className="">
                <Testimonials />
              </div>
            )}
        
        </div>
        <div className="col-span-12 lg:col-span-4 lg:px-0 sm:px-20">
          <div className="mt-10 sm:mt-24 w-full lg:max-w-[300px] lg:px-1 px-3 sticky top-36 pb-14">
            <h1 className="text-3xl mb-4 text-[#00D5A4]">{data?.name}</h1>
            <p className="text-[14px] font-sans mb-4 text-[#00D5A4]">
              {data?.des}
            </p>
            <p
              id="highlight"
              className="my-2 text-[#fff] text-[20px] font-sans"
            >
              Project Descriptions
            </p>
            <p className="text-[14px] font-sans mb-4 text-[#fff]">
              {data?.des1}
            </p>

            <div className="flex flex-wrap">
              <h1 className="mr-5 text-[14px] bg-[#00bcd4] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill1}
              </h1>
              <h1 className="mr-5 text-[14px] bg-[#63c5f1] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill2}
              </h1>
              <h1 className="mr-5 text-[14px] bg-[#63c5f1] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill3}
              </h1>
              <h1 className="mr-5 text-[14px] bg-[#63c5f1] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill4}
              </h1>
              <h1 className="mr-5 text-[14px] bg-[#63c5f1] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill5}
              </h1>
              <h1 className="mr-5 text-[14px] bg-[#63c5f1] lg:bg-[#00bcd4] px-2 py-1 rounded-xl font-sans mb-4 text-white lg:text-[#fff]">
                {data?.skill6}
              </h1>
            </div>

            {/* Render for Wechemapu project */}
            {data.title ===
              "Wechemapu - Por los senderos culturales de la futawillimapu" &&
              data.youtubeLink && (
                <div className="flex flex-col items-center sm:items-start mt-4 space-y-4">
                  <a
                    href={data.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-button flex items-center"
                  >
                    <FaYoutube className="w-6 h-6 mr-2" />{" "}
                    {/* Use FaYoutube icon */}
                    Youtube link
                  </a>

                  <a
                    href={data.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-button flex items-center"
                  >
                    <FaSpotify className="w-6 h-6 mr-2" />{" "}
                    {/* Use FaSpotify icon */}
                    Spotify link
                  </a>
                </div>
              )}

            {/* Render for Wechemapu project */}
            {data.title === "EP production Alian Andahur - Mongen Ta Molkun" &&
              data.youtubeLink && (
                <div className="flex flex-col items-center sm:items-start mt-4 space-y-4">
                  <a
                    href={data.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-button flex items-center"
                  >
                    <FaYoutube className="w-6 h-6 mr-2" />{" "}
                    {/* Use FaYoutube icon */}
                    Youtube link
                  </a>
                </div>
              )}

            {/* Render for folil choyun project */}
            {data.title === "Cultural music production - Folil Choyun" &&
              data.youtubeLink && (
                <div className="flex flex-col items-center sm:items-start mt-4 space-y-4">
                  <a
                    href={data.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-button flex items-center"
                  >
                    <FaYoutube className="w-6 h-6 mr-2" />{" "}
                    {/* Use FaYoutube icon */}
                    Youtube link
                  </a>
                </div>
              )}

         
          </div>
        </div>
      </div>

      <div className="relative flex bg-accent-color h-48 text-white">
        <div
          className={`group w-1/2 flex items-center justify-center bg-cover ${hind.className}`}
          style={{ backgroundImage: `url(${DataArray[prev]?.images[0]})` }}
        >
          <a
            className="flex justify-center group:hover:bg-[#223740] cursor-pointer transition-colors duration-300 bg-[#405B66] bg-opacity-90 items-center w-full h-full"
            onClick={() => router.push(`/portfoliodetail/${prev}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="transform transition-transform group-hover:-translate-x-3 duration-300 w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            Previous Project
          </a>
        </div>

        <div
          className={`group w-1/2 flex items-center justify-center bg-cover ${hind.className}`}
          style={{ backgroundImage: `url(${DataArray[next]?.images[0]})` }}
        >
          <a
            className="flex justify-center group:hover:bg-[#223740] cursor-pointer transition-colors duration-300 bg-[#405B66] bg-opacity-90 items-center w-full h-full"
            onClick={() => router.push(`/portfoliodetail/${next}`)}
          >
            Next Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="transform transition-transform group-hover:translate-x-3 duration-300 w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
