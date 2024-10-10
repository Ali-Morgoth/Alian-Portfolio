import React, { useEffect, useState, useRef } from "react";
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
  const chartRef = useRef(null); // Referencia al gráfico
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del tooltip actual

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

  useEffect(() => {
    // Configurar el intervalo para mostrar el tooltip
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countryData.length);
    }, 2000); // Cambiar cada 2 segundos

    return () => clearInterval(interval);
  }, [countryData]);

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
        label: "Countries Percentage",
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
      y: {
        ticks: {
          font: {
            weight: "bold", // Hacer el texto de los países en negrita
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
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    onClick: (e) => {
      // Código para gestionar clics en el gráfico
    },
  };

  useEffect(() => {
    const chart = chartRef.current; // Referencia al gráfico
    if (chart && countryData.length > 0) {
      // Activar el tooltip correspondiente al índice actual
      chart.tooltip.setActiveElements([
        {
          datasetIndex: 0,
          index: currentIndex,
        },
      ]);
      chart.tooltip.update();
      chart.update();
    }
  }, [currentIndex, countryData]);

  // Definir altura dinámica del gráfico basado en el número de países
  const chartHeight = countryData.length * 50; // 50px por país, ajustable según tu diseño

  return (
    <div
      style={{
        maxWidth: window.innerWidth < 600 ? "100%" : "700px", // Ajusta el ancho para pantallas pequeñas
        margin: "0 auto",
        padding: "20px",
        width: "100%", // Asegúrate de que el contenedor use todo el ancho disponible
      }}
    >
      <div
        style={{
          height: `${chartHeight}px`, // Altura dinámica basada en el número de países
          width: "100%", // Ancho completo en pantallas grandes
          backgroundColor: "white",
          borderWidth: "10px",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div {
            max-width: 100%;
            width: calc(100% - 10px); /* Ajustar al ancho de la card */
            margin-right: 0;
            padding: 10px; /* Reducir padding en pantallas pequeñas */
             margin-left: 1px; /* Mover un poco hacia la izquierda */
          }
        }
      `}</style>
    </div>
  );
};

export default CountryVisitorsChart;
