import { createTodaysWeatherCard } from './todaysWeatherUI';

async function updateWeatherUI(weatherDataPromise) {
  let data = await weatherDataPromise;

  let container = document.querySelector('.todays-weather-content');
  clearContainer(container);

  if (!data || !data.currentConditions) {
    container.textContent = 'Error loading weather data';
    return;
  }

  const todaysWeatherCard = createTodaysWeatherCard(data);
  container.appendChild(todaysWeatherCard);
}

function clearContainer(container) {
  container.textContent = '';
}

export { updateWeatherUI };
