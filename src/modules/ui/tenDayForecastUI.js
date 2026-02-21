import { format, parseISO } from 'date-fns';
import { createIcon } from './icons';

function createTenDayForecastCard(data) {
  const fragment = document.createDocumentFragment();

  let tenDaysArray = createTenDaysArray(data);

  tenDaysArray.forEach((obj) => {
    let date = document.createElement('p');
    date.textContent = formatDate(obj.datetime);
    fragment.appendChild(date);

    let icon = createIcon(obj.icon);
    fragment.appendChild(icon);

    let description = document.createElement('p');
    description.textContent = obj.description;
    fragment.appendChild(description);

    let lowHighTemps = document.createElement('p');
    lowHighTemps.textContent = `${obj.tempmin}°F / ${obj.tempmax}°F`;
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
