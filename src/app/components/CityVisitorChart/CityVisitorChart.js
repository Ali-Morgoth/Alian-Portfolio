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

const CityVisitorsChart = () => {
  const [cityData, setCityData] = useState([]);
  const chartRef = useRef(null); // Referencia al gráfico
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del tooltip actual

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "cities"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        city: doc.data().city,
        count: doc.data().count,
        country: doc.data().country, // Si es necesario para mostrar el país
      }));

      data.sort((a, b) => b.count - a.count);
      setCityData(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Configurar el intervalo para mostrar el tooltip
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cityData.length);
    }, 2000); // Cambiar cada 2 segundos

    return () => clearInterval(interval);
  }, [cityData]);

  const formatCityName = (city) => {
    switch (city) {
      case "New York":
        return "NYC";
      case "Los Angeles":
        return "LA";
      default:
        return city;
    }
  };

  const totalVisits = cityData.reduce((sum, city) => sum + city.count, 0);

  const data = {
    labels: cityData.map((city) => formatCityName(city.city)),
    datasets: [
      {
        label: "Cities Percentage",
        data: cityData.map((city) => (city.count / totalVisits) * 100),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
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
            weight: "bold", // Hacer el texto de las ciudades en negrita
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
        text: "Porcentaje de visitas por ciudad",
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
    if (chart && cityData.length > 0) {
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
  }, [currentIndex, cityData]);

  // Definir altura dinámica del gráfico basado en el número de ciudades
  const chartHeight = cityData.length * 50; // 50px por ciudad, ajustable según tu diseño

  return (
    <div
      style={{
        maxWidth: "700px", // Ancho máximo para pantallas grandes
        margin: "0 auto",
        padding: "20px",
        width: "90%", // Ancho general en pantallas grandes
      }}
    >
      <div
        style={{
          height: `${chartHeight}px`, // Altura dinámica basada en el número de ciudades
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
            margin-left: -20px; /* Mover un poco hacia la izquierda */
          }
        }
      `}</style>
    </div>
  );
};

export default CityVisitorsChart;
