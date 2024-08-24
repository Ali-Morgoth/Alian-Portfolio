// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import SliderCard from "./SliderCard";
// import { DataArray, projects } from "@/app/data";

// export default function MySlider() {

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
//       {DataArray.map((item, index) => (
//         <div key={index} className="my-slider">
//           <SliderCard item={item} index={index} />
//         </div>
//       ))}
// </Slider>
//   );
// }


























import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SliderCard from "./SliderCard";
import { DataArray, projects } from "@/app/data";
import {useLanguage} from "../../Context/LanguageContext"

export default function MySlider() {

  
  const { language } = useLanguage(); // Obtener el idioma desde el contexto

  // Obtener el array de datos en función del idioma
  const dataArray = DataArray({ language });

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    centerMode: true,
    centerPadding: "400px",
    dots: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "400px",
        },
      },
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "350px",
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "300px",
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "170px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "230px",
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "170px",
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "130px",
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
    <Slider {...settings} >
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
  );
}