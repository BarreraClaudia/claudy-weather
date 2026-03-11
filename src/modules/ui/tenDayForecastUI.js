import { format, parseISO } from 'date-fns';
import { createWeatherIcon } from './icons';
import { getDegreesUnit } from '../storage/localStorage';
import { convertFtoC } from '../weather/convertDegrees';

function createTenDayForecastCard(data) {
  const fragment = document.createDocumentFragment();

  let tenDaysArray = createTenDaysArray(data);

  tenDaysArray.forEach((obj) => {
    let dayContainer = document.createElement('div');
    dayContainer.classList.add('day-container');

    let dayOfTheWeekAndDateContainer = document.createElement('div');
    dayOfTheWeekAndDateContainer.classList.add(
      'day-of-the-week-and-date-container',
    );

    let dayOfTheWeek = document.createElement('p');
    dayOfTheWeek.textContent = formatDayOfTheWeek(obj.datetime);
    dayOfTheWeekAndDateContainer.appendChild(dayOfTheWeek);

    let date = document.createElement('p');
    date.textContent = formatDate(obj.datetime);
    dayOfTheWeekAndDateContainer.appendChild(date);

    dayContainer.appendChild(dayOfTheWeekAndDateContainer);

    let icon = createWeatherIcon(obj.icon);
    dayContainer.appendChild(icon);

    let description = document.createElement('p');
    description.textContent = obj.description;
    dayContainer.appendChild(description);

    let lowHighTemps = document.createElement('div');
    lowHighTemps.classList.add('low-high-temps');

    let lowTemp = document.createElement('span');
    lowTemp.classList.add('temp');

    getDegreesUnit() === '°F'
      ? (lowTemp.textContent = `${obj.tempmin}°F`)
      : (lowTemp.textContent = `${convertFtoC(obj.tempmin)}°C`);

    lowHighTemps.appendChild(lowTemp);

    let highTemp = document.createElement('span');
    highTemp.classList.add('temp');

    getDegreesUnit() === '°F'
      ? (highTemp.textContent = `${obj.tempmax}°F`)
      : (highTemp.textContent = `${convertFtoC(obj.tempmax)}°C`);

    lowHighTemps.appendChild(highTemp);

    dayContainer.appendChild(lowHighTemps);
    fragment.appendChild(dayContainer);
  });

  return fragment;
}

function createTenDaysArray(data) {
  let daysArray = data.days;
  let tenDaysArray = daysArray.slice(0, 10);

  return tenDaysArray;
}

function formatDayOfTheWeek(date) {
  let parsedDate = parseISO(date);
  let formattedDate = format(parsedDate, 'EEE');

  return formattedDate;
}

function formatDate(date) {
  let parsedDate = parseISO(date);
  let formattedDate = format(parsedDate, 'M/d');

  return formattedDate;
}

export { createTenDayForecastCard };
