
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import SliderCard from "./SliderCard";
// import { DataArray, projects } from "@/app/data";
// import {useLanguage} from "../../Context/LanguageContext"

// export default function MySlider() {

  
//   const { language } = useLanguage(); // Obtener el idioma desde el contexto

//   // Obtener el array de datos en función del idioma
//   const dataArray = DataArray({ language });

//   var settings = {
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     speed: 500,
//     arrows: false,
//     centerMode: true,
//     centerPadding: "400px",
//     dots: true,
//     responsive: [
//       {
//         breakpoint: 1700,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "400px",
//         },
//       },
//       {
//         breakpoint: 1550,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "350px",
//         },
//       },
//       {
//         breakpoint: 1450,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "300px",
//         },
//       },
//       {
//         breakpoint: 1400,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "250px",
//         },
//       },
//       {
//         breakpoint: 1250,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "200px",
//         },
//       },
//       {
//         breakpoint: 1150,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "170px",
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "230px",
//         },
//       },
//       {
//         breakpoint: 980,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "200px",
//         },
//       },
//       {
//         breakpoint: 920,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "170px",
//         },
//       },
//       {
//         breakpoint: 860,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "130px",
//         },
//       },
//       {
//         breakpoint: 780,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "100px",
//         },
//       },
//       {
//         breakpoint: 765,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//           centerPadding: "170px",
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false,
//           centerMode: false,
//           centerPadding: "0",
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings} >
//     {Array.isArray(dataArray) ? (
//       dataArray.map((item, index) => (
//         <div key={index} className="my-slider">
//           <SliderCard item={item} index={index} />
//         </div>
//       ))
//     ) : (
//       <div>No data available</div>
//     )}
//   </Slider>
//   );
// }


import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";
import { DataArray } from "@/app/data";
import { useLanguage } from "../../Context/LanguageContext";
import './myslider.css'

export default function MySlider() {
  const { language } = useLanguage(); // Obtener el idioma desde el contexto
  const dataArray = DataArray({ language });
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = dataArray.length;

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    centerMode: true,
    centerPadding: "400px",
    dots: false, // Ocultar dots por defecto de slick
    afterChange: (current) => setCurrentSlide(current), // Actualizar el estado con el slide actual
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "400px",
        },
      },
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "350px",
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "300px",
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "170px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "230px",
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "170px",
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "130px",
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: "170px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: false,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {Array.isArray(dataArray) ? (
          dataArray.map((item, index) => (
            <div key={index} className="my-slider">
              <SliderCard item={item} index={index} />
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </Slider>
      
      {/* Indicadores de progreso */}
      <div className="slider-indicators flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`indicator w-4 h-4 mx-2 rounded-full transition-all ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            style={{
              transform: currentSlide === index ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
