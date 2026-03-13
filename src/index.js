import './styles/styles.css';

import {
  getWeather,
  getPosition,
  getCityFromCoords,
} from './modules/weather/weatherAPI.js';
import {
  updateWeatherUI,
  updateDegreesUnitButtonUI,
} from './modules/ui/weatherUI.js';
import {
  saveCityName,
  getCityName,
  saveDegreesUnit,
  getDegreesUnit,
} from './modules/storage/localStorage.js';
import { convertFtoC, convertCtoF } from './modules/weather/convertDegrees.js';

if (!getCityName()) {
  let city = 'chicago';
  saveCityName(city);
  let weatherData = getWeather(city);
  updateWeatherUI(weatherData);
} else {
  let city = getCityName();
  let weatherData = getWeather(city);
  updateWeatherUI(weatherData);
}

if (!getDegreesUnit()) {
  saveDegreesUnit('°F');
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

  if (getDegreesUnit() === '°F') {
    temps.forEach((temp) => {
      let splitTemp = temp.textContent.split('°');
      let tempInC = convertFtoC(splitTemp[0]);
      temp.textContent = `${tempInC}°C`;
    });
    saveDegreesUnit('°C');
    updateDegreesUnitButtonUI();
  } else if (getDegreesUnit() === '°C') {
    temps.forEach((temp) => {
      let splitTemp = temp.textContent.split('°');
      let tempInF = convertCtoF(splitTemp[0]);
      temp.textContent = `${tempInF}°F`;
    });
    saveDegreesUnit('°F');
    updateDegreesUnitButtonUI();
  }
});

let leftArrowButton = document.querySelector('.left-arrow-button');
leftArrowButton.addEventListener('click', () => {
  scrollCards(-200);
});

let rightArrowButton = document.querySelector('.right-arrow-button');
rightArrowButton.addEventListener('click', () => {
  scrollCards(200);
});

function scrollCards(amount) {
  document
    .querySelector('.scroll-container')
    .scrollBy({ left: amount, behavior: 'smooth' });
}
