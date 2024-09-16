import React, { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Registrar el locale inglés para i18n-iso-countries
countries.registerLocale(enLocale);

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Mapeo manual para corregir diferencias en nombres de países
const countryNameMapping = {
  "Russian Federation": "Russia",
  "Republic of Korea": "South Korea",
  // Añade otros mapeos manuales si es necesario
};

const WorldMap = () => {
  const [highlightedCountries, setHighlightedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "countries"));
        const countryNames = querySnapshot.docs.map(doc => doc.data().country);

        // Aplicamos mapeo manual para ajustar los nombres de países
        const adjustedCountryNames = countryNames.map(name =>
          countryNameMapping[name] || name // Usa el nombre mapeado o el original si no está en el mapeo
        );

        setHighlightedCountries(adjustedCountryNames);
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
            const countryName = geo.properties.name;

            // Comparamos con los nombres de los países ajustados
            const isHighlighted = highlightedCountries.includes(countryName);
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
