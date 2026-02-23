import './styles/styles.css';

import {
  getWeather,
  getPosition,
  getCityFromCoords,
} from './modules/weather/weatherAPI.js';
import { updateWeatherUI } from './modules/ui/weatherUI.js';
import { convertFtoC, convertCtoF } from './modules/weather/convertDegrees.js';

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

let convertDegreesButton = document.querySelector('.convert-degrees-button');
convertDegreesButton.addEventListener('click', () => {
  let temps = document.querySelectorAll('.temp');

  if (convertDegreesButton.textContent === '°F') {
    temps.forEach((temp) => {
      let splitTemp = temp.textContent.split('°');
      let tempInC = convertFtoC(splitTemp[0]);
      temp.textContent = `${tempInC}°C`;
    });

    convertDegreesButton.textContent = '°C';
  } else if (convertDegreesButton.textContent === '°C') {
    temps.forEach((temp) => {
      let splitTemp = temp.textContent.split('°');
      let tempInF = convertCtoF(splitTemp[0]);
      temp.textContent = `${tempInF}°F`;
    });

    convertDegreesButton.textContent = '°F';
  }
});

let weatherData = getWeather();
updateWeatherUI(weatherData);
