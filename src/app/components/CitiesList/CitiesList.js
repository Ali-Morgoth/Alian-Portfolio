// // components/CitiesList/CitiesList.js
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '../../lib/firebase';

// const CitiesList = () => {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const citiesCollection = collection(firestore, 'cities');
//         const citiesSnapshot = await getDocs(citiesCollection);
//         const citiesList = citiesSnapshot.docs.map(doc => doc.data());
//         setCities(citiesList);
//       } catch (error) {
//         console.error("Error fetching cities: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCities();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Ciudades principales</h2>
//       {cities.length > 0 ? (
//         <ul>
//           {cities.map((city, index) => (
//             <li key={index}>{city.name}: {city.count}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default CitiesList;
// CitiesList.js

import { useEffect, useState } from 'react';
import { firestore } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const CitiesList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'cities'), (querySnapshot) => {
      const cityData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cityData.push({
          name: data.city,
          country: data.country,
          count: data.count
        });
      });
      setCities(cityData);
    }, (error) => {
      console.error('Failed to fetch cities', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 w-full max-w-md mx-auto my-10 bg-white rounded-lg shadow-lg border-2 border-gray-300 mt-2 cursor-pointer hover:bg-[#476571] hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-sans">Top Cities</h2>
        <span className="text-sm font-sans">Visitors</span>
      </div>
      <ul>
        {cities.map((city, index) => (
          <li key={index} className="py-2 flex justify-between border-b border-gray-200">
         

            <div className="flex space-x-3">
              <span>{index + 1}</span>
              <span>{city.name}</span>
              <span>{city.country}</span>
            </div>
            <span className="font-semibold ml-2">{city.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesList;
