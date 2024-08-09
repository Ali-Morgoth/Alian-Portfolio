// import { useEffect, useState } from 'react';
// import { firestore } from '../../lib/firebase';
// import { collection, onSnapshot } from 'firebase/firestore';

// const CitiesList = () => {
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(firestore, 'cities'), (querySnapshot) => {
//       const cityData = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         cityData.push({
//           name: data.city,
//           country: data.country,
//           count: data.count
//         });
//       });
//       setCities(cityData);
//     }, (error) => {
//       console.error('Failed to fetch cities', error);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="p-4 w-full max-w-md mx-auto my-10 bg-white rounded-lg shadow-lg border-2 border-gray-300 mt-2 cursor-pointer hover:bg-[#476571] hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-sm font-sans">Top Cities</h2>
//         <span className="text-sm font-sans text-[#e91e63]">Visitors</span>
//       </div>
//       <ul className="max-h-32 overflow-y-auto">
//         {cities.map((city, index) => (
//           <li key={index} className="py-2 flex justify-between border-b border-gray-200">
//             <div className="flex space-x-3">
//               <span>{index + 1}</span>
//               <span>{city.name}</span>
//               <span>{city.country}</span>
//             </div>
//             <span className="font-semibold ml-2 text-[#e91e63]">{city.count}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CitiesList;

import { useEffect, useState } from 'react';
import { firestore } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const CitiesList = () => {
  const [cities, setCities] = useState([]);
  const [userCity, setUserCity] = useState(null);
  const [locationChecked, setLocationChecked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = () => {
      const unsubscribe = onSnapshot(
        collection(firestore, 'cities'),
        (querySnapshot) => {
          const cityData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            cityData.push({
              name: data.city,
              country: data.country,
              count: data.count,
            });
          });
          setCities(cityData);
        },
        (error) => {
          console.error('Failed to fetch cities', error);
        }
      );

      return () => unsubscribe();
    };

    const saveCityToFirestore = async (city, country) => {
      try {
        const cityRef = collection(firestore, 'cities');
        const q = query(cityRef, where('city', '==', city), where('country', '==', country));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const existingCityDoc = querySnapshot.docs[0];
          const newCount = existingCityDoc.data().count + 1;
          await updateDoc(doc(firestore, 'cities', existingCityDoc.id), {
            count: newCount,
          });
        } else {
          await addDoc(cityRef, {
            city,
            country,
            count: 1,
          });
        }
      } catch (error) {
        console.error('Error saving city to Firestore:', error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
              .then((response) => response.json())
              .then((data) => {
                const city =
                  data.address.city || data.address.town || data.address.village;
                const country = data.address.country;

                if (!userCity && !locationChecked) {
                  setUserCity(city);
                  saveCityToFirestore(city, country);
                }
                setLocationChecked(true);
              })
              .catch((err) => {
                console.error('Error fetching city from coordinates:', err);
                setError('Failed to get precise location.');
                setLocationChecked(true);
              });
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Location access denied.');
            setLocationChecked(true);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        setLocationChecked(true);
      }
    };

    fetchCities();
    getLocation();
  }, []);

  return (
    <div className="p-4 w-full max-w-md mx-auto my-10 bg-white rounded-lg shadow-lg border-2 border-gray-300 mt-2 cursor-pointer hover:bg-[#476571] hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-sans">Top Cities</h2>
        <span className="text-sm font-sans text-[#e91e63]">Visitors</span>
      </div>
      {userCity && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <strong>Your City:</strong> {userCity}
        </div>
      )}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
      <ul className="max-h-32 overflow-y-auto">
        {cities.map((city, index) => (
          <li
            key={index}
            className="py-2 flex justify-between border-b border-gray-200"
          >
            <div className="flex space-x-3">
              <span>{index + 1}</span>
              <span>{city.name}</span>
              <span>{city.country}</span>
            </div>
            <span className="font-semibold ml-2 text-[#e91e63]">
              {city.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesList;
