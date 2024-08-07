import React, { useEffect, useState } from "react";
import { firestore } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Registrar el locale inglés para i18n-iso-countries
countries.registerLocale(enLocale);

const CountriesList = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "countries"),
      (querySnapshot) => {
        const countryData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data:", data); // Agregar para verificar los datos
          
          let countryName;

          // Si existe un countrycode, obtenemos el nombre del país utilizando i18n-iso-countries
          if (data.countrycode) {
            countryName = countries.getName(data.countrycode, "en");
          } else if (data.country) {
            // Si no existe countrycode, usamos el nombre del país directamente de los datos
            countryName = data.country;
          } else {
            countryName = "Unknown"; // Manejar casos donde no hay countrycode ni country
          }

          countryData.push({
            name: countryName,
            count: data.count,
          });
        });
        setCountriesData(countryData);
      },
      (error) => {
        console.error("Failed to fetch countries", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 w-full max-w-md mx-auto my-10 bg-white rounded-lg shadow-lg border-2 border-gray-300 mt-2 cursor-pointer hover:bg-[#476571] hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-sans">Top Countries</h2>
        <span className="text-sm font-sans ml-16 text-[#e91e63]">Visitors</span>
      </div>
      <ul className="max-h-32 overflow-y-auto">
        {countriesData.map((country, index) => (
          <li
            key={index}
            className="py-2 flex justify-between border-b border-gray-200"
          >
            <div className="flex space-x-3">
              <span>{index + 1}</span>
              <span>{country.name}</span>
            </div>
            <span className="font-semibold text-[#e91e63]">{country.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;

