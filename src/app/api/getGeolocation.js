
import countries from 'i18n-iso-countries';

export async function getGeolocation() {
  try {
    const response = await fetch(`https://ipinfo.io?token=4f52d2956beaa7`);
    const data = await response.json();
    console.log('Geolocation data:', data);

    const countryName = countries.getName(data.country, 'en');

    return {
      country: countryName,
      countryCode: data.country,
      city: data.city,
    };
  } catch (error) {
    console.error('Failed to get geolocation', error);
    throw error;
  }
}
