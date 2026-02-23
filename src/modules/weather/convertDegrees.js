function convertFtoC(tempInF) {
  let tempInC = (tempInF - 32) * (5 / 9);
  let roundTempInC = Math.round(tempInC * 10) / 10;
  return roundTempInC;
}

function convertCtoF(tempInC) {
  let tempInF = tempInC * (9 / 5) + 32;
  let roundTempInF = Math.round(tempInF * 10) / 10;
  return roundTempInF;
}

export { convertFtoC, convertCtoF };
