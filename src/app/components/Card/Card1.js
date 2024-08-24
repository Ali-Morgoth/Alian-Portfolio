import React from "react";
import PropTypes from "prop-types";

const Card1 = ({ children }) => {
  return (
    <div className="card">
      {/* Loader en lugar de la imagen */}
      <div className="terminal">
        <div className="terminal-header">
          <div className="buttons">
            <span className="close"></span>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="title">Status</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-loader">
            <span className="loader-text">Geolocation inicialized</span>
            <span id="dot1" className="dot">.</span>
            <span id="dot2" className="dot">.</span>
            <span id="dot3" className="dot">.</span>
          </div>
        </div>
      </div>

      <div className="heading">
        {children}
      </div>
    

      {/* Estilos CSS */}
      <style jsx>{`
        .card {
          position: relative;
          width: 21em;
          height: 25em;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          background-color: #171717;
          color: black;
          font-family: Montserrat;
          font-weight: bold;
          padding: 1em 2em 1em 1em;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
          row-gap: 1em;
        }

        .terminal {
          width: 19em; /* Ajuste el tamaño según sea necesario */
          background-color: #000;
          color: #0f0;
          font-family: "Courier New", Courier, monospace;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
           min-height: 5em;
           margin-top: 10px;
          
        }

        .terminal-header {
          background-color: #333;
          padding: 5px;
          display: flex;
          align-items: center;
          color: #fff;
        }

        .buttons {
          display: flex;
          margin-right: 15px;
        }

        .buttons span {
          height: 15px;
          width: 15px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }

        .close {
          background-color: #ff605c;
        }
        .minimize {
          background-color: #ffbd44;
        }
        .maximize {
          background-color: #00ca4e;
        }

        .title {
          flex-grow: 1;
          text-align: center;
        }

        .terminal-body {
          padding: 10px;
        }

        .terminal-loader {
          display: inline-flex;
          align-items: center;
        }

        .loader-text {
          margin-right: 5px;
       
        }

        .dot {
          opacity: 0;
          animation: dotFadeInOut 1.5s infinite;
        }

        @keyframes dotFadeInOut {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        #dot1 {
          animation-delay: 0.5s;
        }

        #dot2 {
          animation-delay: 0.6s;
        }

        #dot3 {
          animation-delay: 0.7s;
        }

        .icons svg {
          width: 20px;
          height: 20px;
        }

        .card::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          inset: -3px;
          border-radius: 10px;
          background: radial-gradient(#858585, transparent, transparent);
          transform: translate(-5px, 250px);
          transition: 0.4s ease-in-out;
          z-index: -1;
        }

        .card:hover::before {
          width: 150%;
          height: 100%;
          margin-left: -4.25em;
        }

        .card::after {
          content: "";
          position: absolute;
          inset: 2px;
          border-radius: 20px;
          background: rgba(23, 23, 23, 0.7);
          transition: all 0.4s ease-in-out;
          z-index: -1;
        }

        .heading {
          z-index: 2;
          transition: 0.4s ease-in-out;
        }

        .card:hover .heading {
          letter-spacing: 0.025em;
        }

        .heading::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 1;
          box-shadow: 220px 118px #fff, 280px 176px #fff, 40px 50px #fff,
            60px 180px #fff, 120px 130px #fff, 180px 176px #fff, 220px 290px #fff,
            520px 250px #fff, 400px 220px #fff, 50px 350px #fff, 10px 230px #fff;
          z-index: -1;
          transition: 1s ease;
          animation: 1s glowing-stars linear alternate infinite;
          animation-delay: 0s;
        }

        .icons::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 1;
          box-shadow: 140px 20px #fff, 425px 20px #fff, 70px 120px #fff, 20px 130px #fff,
            110px 80px #fff, 280px 80px #fff, 250px 350px #fff, 280px 230px #fff,
            220px 190px #fff, 450px 100px #fff, 380px 80px #fff, 520px 50px #fff;
          z-index: -1;
          transition: 1.5s ease;
          animation: 1s glowing-stars linear alternate infinite;
          animation-delay: 0.4s;
        }

        .icons::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 1;
          box-shadow: 490px 330px #fff, 420px 300px #fff, 320px 280px #fff,
            380px 350px #fff, 546px 170px #fff, 420px 180px #fff, 370px 150px #fff,
            200px 250px #fff, 80px 20px #fff, 190px 50px #fff, 270px 20px #fff,
            120px 230px #fff, 350px -1px #fff, 150px 369px #fff;
          z-index: -1;
          transition: 2s ease;
          animation: 1s glowing-stars linear alternate infinite;
          animation-delay: 0.8s;
        }

        .card:hover .heading::before,
        .card:hover .icons::before,
        .card:hover .icons::after {
          filter: blur(3px);
        }

        @keyframes glowing-stars {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

Card1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card1;
