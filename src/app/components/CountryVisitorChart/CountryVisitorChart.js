import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CountryVisitorsChart = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "countries"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        country: doc.data().country,
        count: doc.data().count,
      }));

      data.sort((a, b) => b.count - a.count);
      setCountryData(data);
    });

    return () => unsubscribe();
  }, []);

  const formatCountryName = (country) => {
    switch (country) {
      case "United States of America":
        return "USA";
      case "Russian Federation":
        return "Russia";
      default:
        return country;
    }
  };

  const totalVisits = countryData.reduce((sum, country) => sum + country.count, 0);

  const data = {
    labels: countryData.map((country) => formatCountryName(country.country)),
    datasets: [
      {
        label: "Porcentaje de visitas",
        data: countryData.map((country) => (country.count / totalVisits) * 100),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Porcentaje de visitas por país",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20, // Ajustar el padding a la derecha
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "700px", // Ancho máximo para pantallas grandes
        margin: "0 auto",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "90%", // Ancho general en pantallas grandes
      }}
    >
      <div
        style={{
          height: "400px", // Altura para pantallas grandes
          width: "100%", // Ancho completo en pantallas grandes
        }}
      >
        <Bar data={data} options={options} />
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div {
            max-width: 100%;
            width: calc(100% - 20px); /* Ajustar al ancho de la card */
            margin-right: 0;
            padding: 10px; /* Reducir padding en pantallas pequeñas */
          }
        }
      `}</style>
    </div>
  );
};

export default CountryVisitorsChart;
