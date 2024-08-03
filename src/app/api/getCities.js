// getCities.js

import { firestore } from '../../app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Método no permitido
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, 'cities'));
    const cityCount = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const city = `${data.city}, ${data.country}`;
      cityCount[city] = (cityCount[city] || 0) + 1;
    });

    const cities = Object.keys(cityCount).map(city => ({
      name: city.split(', ')[0],
      country: city.split(', ')[1],
      count: cityCount[city]
    }));

    res.status(200).json(cities);
  } catch (error) {
    console.error('Error al obtener datos de ciudades', error);
    res.status(500).json({ error: 'Failed to get cities data' });
  }
}
