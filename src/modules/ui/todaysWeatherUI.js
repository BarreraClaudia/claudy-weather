import { format, parse } from 'date-fns';
import { createWeatherIcon, createAlertIcon } from './icons';
import { getDegreesUnit } from '../storage/localStorage';
import { convertFtoC } from '../weather/convertDegrees';

function formatTodaysDate() {
  let todaysDate = new Date();
  let formattedDate = format(todaysDate, 'MMMM d, yyyy');
  return formattedDate;
}

function formatTime(time) {
  let parsedTime = parse(time, 'HH:mm:ss', new Date());
  let formattedTime = format(parsedTime, 'h:mm aaa');
  return formattedTime;
}

function capitalizeEachWord(string) {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createConditionCard(titleName, dataValue) {
  let container = document.createElement('div');
  container.classList.add('condition-card');

  let title = document.createElement('p');
  title.textContent = titleName;
  container.appendChild(title);

  let conditionData = document.createElement('p');
  conditionData.textContent = dataValue;
  container.appendChild(conditionData);

  return container;
}

function createAlertsCard(alerts) {
  let container = document.createElement('div');
  container.classList.add('alerts-container');

  let icon = createAlertIcon();
  container.appendChild(icon);

  alerts.forEach((alert) => {
    let headlinePara = document.createElement('p');
    headlinePara.textContent = alert.headline;
    container.appendChild(headlinePara);
  });

  return container;
}

function createTodaysWeatherCard(data) {
  let fragment = document.createDocumentFragment();

  if (data.alerts.length > 0) {
    let alertsCard = createAlertsCard(data.alerts);
    fragment.appendChild(alertsCard);
  }

  let summaryContainer = document.createElement('div');
  summaryContainer.classList.add('summary-container');

  let locationName = document.createElement('h2');
  locationName.textContent = capitalizeEachWord(data.resolvedAddress);
  summaryContainer.appendChild(locationName);

  let date = document.createElement('p');
  date.textContent = formatTodaysDate();
  summaryContainer.appendChild(date);

  let icon = createWeatherIcon(data.currentConditions.icon);
  summaryContainer.appendChild(icon);

  let temp = document.createElement('p');
  temp.classList.add('temp');
  getDegreesUnit() === '°F'
    ? (temp.textContent = `${data.currentConditions.temp}°F`)
    : (temp.textContent = `${convertFtoC(data.currentConditions.temp)}°C`);
  summaryContainer.appendChild(temp);

  let description = document.createElement('p');
  description.textContent = data.description;
  summaryContainer.appendChild(description);

  let conditionsContainer = document.createElement('div');
  conditionsContainer.classList.add('conditions-container');

  let feelsLike = createConditionCard(
    'Feels Like',
    getDegreesUnit() === '°F'
      ? `${data.currentConditions.feelslike}°F`
      : `${convertFtoC(data.currentConditions.feelslike)}°C`,
  );
  feelsLike.children[1].classList.add('temp');
  conditionsContainer.appendChild(feelsLike);

  let wind = createConditionCard(
    'Wind Speed',
    `${data.currentConditions.windspeed} mph`,
  );
  conditionsContainer.appendChild(wind);

  let precipitation = createConditionCard(
    'Chance of Rain',
    `${data.currentConditions.precip}%`,
  );
  conditionsContainer.appendChild(precipitation);

  let uvIndex = createConditionCard('UV Index', data.currentConditions.uvindex);
  conditionsContainer.appendChild(uvIndex);

  let sunrise = createConditionCard(
    'Sunrise',
    formatTime(data.currentConditions.sunrise),
  );
  conditionsContainer.appendChild(sunrise);

  let sunset = createConditionCard(
    'Sunset',
    formatTime(data.currentConditions.sunset),
  );
  conditionsContainer.appendChild(sunset);

  fragment.appendChild(summaryContainer);
  fragment.appendChild(conditionsContainer);

  return fragment;
}

export { createTodaysWeatherCard };
