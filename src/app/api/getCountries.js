// getCountries.js

import { firestore } from '../../app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Método no permitido
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, 'countries'));
    const countryCount = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      countryCount[data.country] = (countryCount[data.country] || 0) + 1;
    });

    const countries = Object.keys(countryCount).map(country => ({
      name: country,
      count: countryCount[country]
    }));

    res.status(200).json(countries);
  } catch (error) {
    console.error('Error al obtener datos de países', error);
    res.status(500).json({ error: 'Failed to get countries data' });
  }
}
