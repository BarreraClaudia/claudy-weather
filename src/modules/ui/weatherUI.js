import { createTodaysWeatherCard } from './todaysWeatherUI';
import { createHourlyForecastCard } from './hourlyForecastUI';
import { createTenDayForecastCard } from './tenDayForecastUI';

async function updateWeatherUI(weatherDataPromise) {
  let data = await weatherDataPromise;

  let todaysWeatherContainer = document.querySelector(
    '.todays-weather-content',
  );
  clearContainer(todaysWeatherContainer);

  if (!data || !data.currentConditions) {
    todaysWeatherContainer.textContent = 'Error loading weather data';
    return;
  }

  let todaysWeatherCard = createTodaysWeatherCard(data);
  todaysWeatherContainer.appendChild(todaysWeatherCard);

  let hourlyForecastContainer = document.querySelector(
    '.hourly-forecast-content',
  );
  clearContainer(hourlyForecastContainer);

  let hourlyForecastCard = createHourlyForecastCard(data);
  hourlyForecastContainer.appendChild(hourlyForecastCard);

  let tenDayForecastContainer = document.querySelector(
    '.ten-day-forecast-content',
  );
  clearContainer(tenDayForecastContainer);

  let tenDayForecastCard = createTenDayForecastCard(data);
  tenDayForecastContainer.appendChild(tenDayForecastCard);
}

function clearContainer(container) {
  container.textContent = '';
}

export { updateWeatherUI };
