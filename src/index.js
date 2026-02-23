import './styles/styles.css';

import {
  getWeather,
  getPosition,
  getCityFromCoords,
} from './modules/api/weatherAPI.js';
import { updateWeatherUI } from './modules/ui/weatherUI.js';

let searchLocationButton = document.querySelector('.search-location-button');
searchLocationButton.addEventListener('click', async (event) => {
  event.preventDefault();

  let locationInput = document.querySelector('#search-location').value.trim();

  if (!locationInput) return;

  try {
    const weatherData = await getWeather(locationInput);
    updateWeatherUI(weatherData);
  } catch (error) {
    console.error(error.message);
  }
});

let currentLocationButton = document.querySelector('.current-location-button');
currentLocationButton.addEventListener('click', async () => {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const city = await getCityFromCoords(lat, lng);
    const weatherData = await getWeather(city);
    updateWeatherUI(weatherData);
  } catch (error) {
    console.error(error.message);
  }
});

let weatherData = getWeather();
updateWeatherUI(weatherData);
