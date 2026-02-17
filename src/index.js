import './styles/styles.css';

import { updateWeatherUI } from './modules/ui/weatherUI.js';
import { getWeather } from './modules/getWeather.js';

let weatherData = getWeather();
updateWeatherUI(weatherData);
