import './styles/styles.css';

import {
  getWeather,
  getPosition,
  getCityFromCoords,
} from './modules/weather/weatherAPI.js';
import { updateWeatherUI } from './modules/ui/weatherUI.js';
import { convertFtoC, convertCtoF } from './modules/weather/convertDegrees.js';

function saveCityName(city) {
  localStorage.setItem('City Name', city);
}

if (!localStorage.getItem('City Name')) {
  let newYork = 'new%20york';
  saveCityName(newYork);
  let weatherData = getWeather(newYork);
  updateWeatherUI(weatherData);
} else {
  let city = localStorage.getItem('City Name');
  let weatherData = getWeather(city);
  updateWeatherUI(weatherData);
}

let searchLocationButton = document.querySelector('.search-location-button');
searchLocationButton.addEventListener('click', async (event) => {
  event.preventDefault();

  let locationInput = document.querySelector('#search-location');
  let locationValue = locationInput.value.trim();

  if (!locationValue) return;

  try {
    const weatherData = await getWeather(locationValue);
    updateWeatherUI(weatherData);
    saveCityName(locationValue);
    locationInput.value = '';
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
    saveCityName(city);
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
