import { format, parse } from 'date-fns';

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

function createTodaysWeatherCard(data) {
  const fragment = document.createDocumentFragment();

  const firstContainer = document.createElement('div');
  firstContainer.classList.add('.first-container');

  let locationName = document.createElement('h2');
  locationName.textContent = capitalizeEachWord(data.resolvedAddress);
  firstContainer.appendChild(locationName);

  let date = document.createElement('p');
  date.textContent = formatTodaysDate();
  firstContainer.appendChild(date);

  let temp = document.createElement('p');
  temp.textContent = `${data.currentConditions.temp}°F`;
  firstContainer.appendChild(temp);

  let description = document.createElement('p');
  description.textContent = data.description;
  firstContainer.appendChild(description);

  const secondContainer = document.createElement('div');
  secondContainer.classList.add('.second-container');

  let feelsLike = createConditionCard(
    'Feels Like',
    `${data.currentConditions.feelslike}°F`,
  );
  secondContainer.appendChild(feelsLike);

  let wind = createConditionCard(
    'Wind Speed',
    `${data.currentConditions.windspeed} mph`,
  );
  secondContainer.appendChild(wind);

  let precipitation = createConditionCard(
    'Chance of Rain',
    `${data.currentConditions.precip}%`,
  );
  secondContainer.appendChild(precipitation);

  let uvIndex = createConditionCard('UV Index', data.currentConditions.uvindex);
  secondContainer.appendChild(uvIndex);

  let sunrise = createConditionCard(
    'Sunrise',
    formatTime(data.currentConditions.sunrise),
  );
  secondContainer.appendChild(sunrise);

  let sunset = createConditionCard(
    'Sunset',
    formatTime(data.currentConditions.sunset),
  );
  secondContainer.appendChild(sunset);

  fragment.appendChild(firstContainer);
  fragment.appendChild(secondContainer);

  return fragment;
}

export { createTodaysWeatherCard };
