import { format, parse } from 'date-fns';
import { createWeatherIcon } from './icons';
import { getDegreesUnit } from '../storage/localStorage';
import { convertFtoC } from '../weather/convertDegrees';

function createHourlyForecastCard(data) {
  let fragment = document.createDocumentFragment();

  let twelveHoursArray = createTwelveHoursArray(data);

  twelveHoursArray.forEach((obj) => {
    let hourlyForecastCard = document.createElement('div');
    hourlyForecastCard.classList.add('hourly-forecast-card');

    let time = document.createElement('p');
    time.textContent = formatTime(obj.datetime);
    hourlyForecastCard.appendChild(time);

    let icon = createWeatherIcon(obj.icon);
    hourlyForecastCard.appendChild(icon);

    let temp = document.createElement('p');
    temp.classList.add('temp');

    getDegreesUnit() === '°F'
      ? (temp.textContent = `${obj.temp}°F`)
      : (temp.textContent = `${convertFtoC(obj.temp)}°C`);

    hourlyForecastCard.appendChild(temp);

    fragment.appendChild(hourlyForecastCard);
  });

  return fragment;
}

function createTwelveHoursArray(data) {
  let hoursArray = data.days[0].hours;
  let currentHour = getCurrentHour();
  let slicedArray = hoursArray.slice(currentHour, currentHour + 12);

  if (slicedArray.length < 12) {
    let nextDayHoursArray = data.days[1].hours;
    let index = 12 - slicedArray.length;
    let slicedNextDayHoursArray = nextDayHoursArray.slice(0, index);
    let mergedArray = [...slicedArray, ...slicedNextDayHoursArray];
    return mergedArray;
  } else {
    return slicedArray;
  }
}

function getCurrentHour() {
  let date = new Date();
  let currentHour = date.getHours();
  return currentHour;
}

function formatTime(time) {
  let parsedTime = parse(time, 'HH:mm:ss', new Date());
  let formattedTime = format(parsedTime, 'h aaa');
  return formattedTime;
}

export { createHourlyForecastCard };
