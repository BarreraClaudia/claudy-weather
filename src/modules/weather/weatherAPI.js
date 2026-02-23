async function getWeather(location = 'new%20york') {
  const apiKey = '96KJDDHVX6WXS5YF76CZPZ8D7';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Weather fetch error:', error.message);
    throw error;
  }
}

function getPosition(options = { enableHighAccuracy: true, timeout: 5000 }) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function getCityFromCoords(lat, lng) {
  const apiKey = 'pk.2b7d02841b6e2c346edc5e1da10b7b7e';
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to reverse geocode');

    const data = await response.json();

    return data.address.city || data.address.town || data.address.village;
  } catch (error) {
    console.error('Reverse geocoding failed:', error.message);
    return null;
  }
}

export { getWeather, getPosition, getCityFromCoords };
