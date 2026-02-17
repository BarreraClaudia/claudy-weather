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

export { getWeather };
