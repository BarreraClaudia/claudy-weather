import { format, parseISO } from 'date-fns';
import { createWeatherIcon } from './icons';

function createTenDayForecastCard(data) {
  const fragment = document.createDocumentFragment();

  let tenDaysArray = createTenDaysArray(data);

  tenDaysArray.forEach((obj) => {
    let date = document.createElement('p');
    date.textContent = formatDate(obj.datetime);
    fragment.appendChild(date);

    let icon = createWeatherIcon(obj.icon);
    fragment.appendChild(icon);

    let description = document.createElement('p');
    description.textContent = obj.description;
    fragment.appendChild(description);

    let lowHighTemps = document.createElement('div');

    let lowTemp = document.createElement('span');
    lowTemp.classList.add('temp');
    lowTemp.textContent = `${obj.tempmin}°F`;
    lowHighTemps.appendChild(lowTemp);

    let slash = document.createElement('span');
    slash.textContent = ' / ';
    lowHighTemps.appendChild(slash);

    let highTemp = document.createElement('span');
    highTemp.classList.add('temp');
    highTemp.textContent = `${obj.tempmax}°F`;
    lowHighTemps.appendChild(highTemp);

    fragment.appendChild(lowHighTemps);
  });

  return fragment;
}

function createTenDaysArray(data) {
  let daysArray = data.days;
  let tenDaysArray = daysArray.slice(0, 10);

  return tenDaysArray;
}

function formatDate(date) {
  let parsedDate = parseISO(date);
  let formattedDate = format(parsedDate, 'EEE M/d');

  return formattedDate;
}

export { createTenDayForecastCard };
