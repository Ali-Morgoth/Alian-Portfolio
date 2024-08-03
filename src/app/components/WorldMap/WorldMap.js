import React, { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Registrar el locale inglés para i18n-iso-countries
countries.registerLocale(enLocale);

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const WorldMap = () => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "countries"));
        const countryNames = querySnapshot.docs.map(doc => doc.data().country);
        // console.log("Country Names from Firestore:", countryNames); 
        setHighlightedCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries from Firestore", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            console.log("Geography Object:", geo); // Debugging log to inspect the geo object
            const countryName = geo.properties.name;
            // console.log("Geography Country Name:", countryName); 

            const isHighlighted = highlightedCountries.includes(countryName);
            if (isHighlighted) {
              // console.log("Highlighted Country:", countryName); 
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isHighlighted ? "red" : "#D6D6DA"}
                stroke="#FFFFFF"
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;

