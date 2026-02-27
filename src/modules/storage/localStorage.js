function saveCityName(city) {
  localStorage.setItem('city-name', city);
}

function getCityName() {
  return localStorage.getItem('city-name');
}

function saveDegreesUnit(unit) {
  localStorage.setItem('degrees-unit', unit);
}

function getDegreesUnit() {
  return localStorage.getItem('degrees-unit');
}

export { saveCityName, getCityName, saveDegreesUnit, getDegreesUnit };
