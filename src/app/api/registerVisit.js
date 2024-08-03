


import { firestore } from '../../app/lib/firebase';
import { collection, doc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

export async function registerVisit(geoData) {
  try {
    const citiesRef = collection(firestore, 'cities');
    const countriesRef = collection(firestore, 'countries');

    // Crear referencias de documento con IDs basados en el nombre de la ciudad y el país
    const cityDocRef = doc(citiesRef, geoData.city);
    const countryDocRef = doc(countriesRef, geoData.country);

    // Buscar si la ciudad ya existe
    const cityDoc = await getDocs(query(citiesRef, where('city', '==', geoData.city)));
    if (!cityDoc.empty) {
      // Si la ciudad existe, actualizar el conteo
      cityDoc.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          count: doc.data().count + 1,
          timestamp: new Date()
        });
      });
    } else {
      // Si la ciudad no existe, agregar un nuevo documento
      await setDoc(cityDocRef, {
        city: geoData.city,
        country: geoData.country,
        count: 1,
        timestamp: new Date()
      });
    }

    // Buscar si el país ya existe
    const countryDoc = await getDocs(query(countriesRef, where('country', '==', geoData.country)));
    if (!countryDoc.empty) {
      // Si el país existe, actualizar el conteo
      countryDoc.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          count: doc.data().count + 1,
          timestamp: new Date()
        });
      });
    } else {
      // Si el país no existe, agregar un nuevo documento
      await setDoc(countryDocRef, {
        country: geoData.country,
        count: 1,
        timestamp: new Date()
      });
    }

    console.log('Visit registered successfully');
  } catch (error) {
    console.error('Failed to register visit', error);
    throw error;
  }
}
