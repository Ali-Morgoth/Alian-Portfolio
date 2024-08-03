import React from "react";
import PropTypes from "prop-types";

const Card1 = ({ children }) => {
  return (
    <div className="card">
      <div className="boxshadow"></div>
      <div className="main">
        <div className="top"></div>
        <div className="side left"></div>
        <div className="side right"></div>

        <div className="button-container">
          <div className="">
            {children} {/* Aquí renderizamos el contenido dinámico */}
          </div>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        .card {
          position: relative;
          height: 300px;
          width: 230px;
        }

        .card .boxshadow {
          position: absolute;
          height: 100%;
          width: 100%;
          border: 1px solid blue; /* Cambiado de rojo a azul */
          transform: scale(0.8);
          box-shadow: rgb(0, 0, 255) 0px 30px 70px 0px; /* Cambiado de rojo a azul */
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }

        .card .main {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: rgb(0, 255, 149);
          background: linear-gradient(
            0deg,
            #3e0000 0%,
            rgb(0, 247, 255) 60%,
            #3e0000 100%
          );
          position: relative;
          clip-path: polygon(
            0 0,
            100% 0,
            100% 40px,
            100% calc(100% - 40px),
            calc(100% - 40px) 100%,
            40px 100%,
            0 calc(100% - 40px)
          );
          box-shadow: rgb(0, 0, 255) 0px 7px 29px 0px; /* Cambiado de rojo a azul */
          transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }

        .card .main .top {
          position: absolute;
          top: 0px;
          left: 0;
          width: 0px;
          height: 0px;
          z-index: 2;
          border-top: 115px solid black;
          border-left: 115px solid transparent;
          border-right: 115px solid transparent;
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }

        .card .main .side {
          position: absolute;
          width: 100%;
          top: 0;
          transform: translateX(-50%);
          height: 101%;
          background: black;
          clip-path: polygon(0% 0%, 50% 0, 95% 45%, 100% 100%, 0% 100%);
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 1s;
        }

        .card .main .left {
          left: 0;
        }

        .card .main .right {
          right: 0;
          transform: translateX(50%) scale(-1, 1);
        }

        .card .main .title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 90px;
          font-weight: bold;
          font-size: 25px;
          opacity: 0;
          z-index: -1;
          transition: all 0.2s ease-out 0s;
        }

        .card .main .button-container {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .card .main .button {
          position: absolute;
          transform: translateX(-50%);
          padding: 5px 10px;
          clip-path: polygon(0 0, 100% 0, 81% 100%, 21% 100%);
          background: black;
          border: none;
          color: white;
          display: grid;
          place-content: center;
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }

        .card .main .button:hover {
          transform: scale(1.1);
        }

        .card .main .button:hover .svg {
          transform: scale(1.2);
        }

        .card .main .button:active .svg {
          transform: scale(0.7);
        }

        .card:hover .main {
          transform: scale(1.1);
        }

        .card:hover .main .top {
          top: -50px;
        }

        .card:hover .main .left {
          left: -50px;
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
        }

        .card:hover .main .right {
          right: -50px;
          transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
        }

        .card:hover .main .title {
          opacity: 1;
          transition: all 0.2s ease-out 1.3s;
        }

        .card:hover .main .button-container .button:nth-child(1) {
          bottom: 80px;
          transition-delay: 0.8s;
        }

        .card:hover .main .button-container .button:nth-child(2) {
          bottom: 40px;
          transition-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

Card1.propTypes = {
  children: PropTypes.node.isRequired, // Asegura que se pase contenido como hijo
};

export default Card1;
