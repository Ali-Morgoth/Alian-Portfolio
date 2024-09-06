// import React from 'react';
// import Image from 'next/image';

// const LoadingScreen = () => {
//   const containerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#1f1f1f',
//     zIndex: 1000,
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//   };

//   return (
//     <div style={containerStyle}>
//       <Image
//         src="/PerfilTitulo.png"
//         alt="PerfilTitulo"
//         width={500}
//         height={300}
//       />
//     </div>
//   );
// };

// export default LoadingScreen;

import React from 'react';
import styles from './LoadingScreen.module.css'; // Cambiado a .module.css
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    
    <div className={styles.loadingScreen}>
      <div className={styles.loader}>
        <div className={`${styles['load-inner']} ${styles['load-one']}`}></div>
        <div className={`${styles['load-inner']} ${styles['load-two']}`}></div>
        <div className={`${styles['load-inner']} ${styles['load-three']}`}></div>
      </div>
      <Image
        src="/PerfilTitulo.webp"
        alt="PerfilTitulo"
        width={500}
        height={300}
      />
    </div>
  );
};

export default LoadingScreen;
