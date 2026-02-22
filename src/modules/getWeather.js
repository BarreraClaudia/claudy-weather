import { updateWeatherUI } from './ui/weatherUI';

async function getWeather(location = 'new%20york') {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=96KJDDHVX6WXS5YF76CZPZ8D7`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Location not found. Please check the spelling.');
      }
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('result from getWeather:', result);
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

let searchLocationButton = document.querySelector('.search-location-button');

searchLocationButton.addEventListener('click', async (event) => {
  event.preventDefault();

  let location = document.querySelector('#search-location').value.trim();

  if (!location) return;

  const weatherData = await getWeather(location);

  updateWeatherUI(weatherData);
});

let currentLocationButton = document.querySelector('.current-location-button');

currentLocationButton.addEventListener('click', handleLocationClick);

async function handleLocationClick() {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const city = await getCityFromCoords(lat, lng);

    const weatherData = await getWeather(city);
    updateWeatherUI(weatherData);
  } catch (error) {
    console.error('Error getting location or city:', error);
  }
}

function getPosition(options = { enableHighAccuracy: true, timeout: 5000 }) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function getCityFromCoords(lat, lng) {
  const apiKey = 'pk.2b7d02841b6e2c346edc5e1da10b7b7e';
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`;

  const response = await fetch(url);

  if (!response.ok) throw new Error('Failed to reverse geocode');

  const data = await response.json();
  return data.address.city || data.address.town || data.address.village;
}

export { getWeather };
