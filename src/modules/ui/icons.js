import snowScr from '../../assets/imgs/snow.png';
import rainScr from '../../assets/imgs/rain.png';
import fogScr from '../../assets/imgs/fog.png';
import windScr from '../../assets/imgs/wind.png';
import cloudyScr from '../../assets/imgs/cloudy.png';
import partlyCloudyDayScr from '../../assets/imgs/partly-cloudy-day.png';
import partlyCloudyNightScr from '../../assets/imgs/partly-cloudy-night.png';
import clearDayScr from '../../assets/imgs/clear-day.png';
import clearNightScr from '../../assets/imgs/clear-night.png';

function createIcon(iconData) {
  let icon = document.createElement('img');
  icon.classList.add('weather-icon');

  console.log(iconData);

  switch (iconData) {
    case 'snow':
      icon.src = snowScr;
      break;
    case 'rain':
      icon.src = rainScr;
      break;
    case 'fog':
      icon.src = fogScr;
      break;
    case 'wind':
      icon.src = windScr;
      break;
    case 'cloudy':
      icon.src = cloudyScr;
      break;
    case 'partly-cloudy-day':
      icon.src = partlyCloudyDayScr;
      break;
    case 'partly-cloudy-night':
      icon.src = partlyCloudyNightScr;
      break;
    case 'clear-day':
      icon.src = clearDayScr;
      break;
    case 'clear-night':
      icon.src = clearNightScr;
      break;

    default:
      icon.src = '';
  }

  return icon;
}

export { createIcon };
