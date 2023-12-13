










function calculateTODR(elevation, oat, tom, vw, contamination, slope) {

  const dtoh = 0.0000125 * Math.pow(elevation, 2) + 0.155 * elevation + 1720;
  const dtot =
    (oat + 15) *
    (0.0000002 * Math.pow(elevation, 2) + 0.00195 * elevation + 18);

  let dtom;
  let dtow;

  if (tom >= 3350) {
    dtom =
      (3800 - tom) *
      (-0.00000017 * Math.pow(dtoh + dtot, 2) +
        0.00017688 * (dtoh + dtot) -
        1.49);
  } else {
    dtom =
      450 *
        (-0.00000017 * Math.pow(dtoh + dtot, 2) +
          0.00017688 * (dtoh + dtot) -
          1.49) +
      (3350 - tom) *
        (0.000000007 * Math.pow(dtoh + dtot, 2) -
          0.000618 * (dtoh + dtot) +
          0.0552);
  }

  if (vw === 0) {
    dtow = 0;
  } else if (vw < 0) {
    dtow =
      vw *
      (0.000004 * Math.pow(dtoh + dtot + dtom, 2) -
        0.0436 * (dtoh + dtot + dtom) -
        10.5);
  } else {
    dtow =
      vw *
      (0.00000033 * Math.pow(dtoh + dtot + dtom, 2) -
        0.008 * (dtoh + dtot + dtom) -
        10.667);
  }

  const todr = Math.round(
    ((dtoh + dtow + dtom + dtot) * contamination * (1 + 0.05 * slope)) / 3.28
  );

  return todr;
}

function calculateFactoredRunwayDistance(tora, toda, asda) {
  if (tora === toda && toda === asda) {
    return tora/1.25;
  }

  return Math.round(Math.min(tora, toda / 1.15));
}

function calculateASDR(elevation, oat, tom, vw, contamination, slope) {

  const dash = 0.0000079 * Math.pow(elevation, 2) + 0.1856 * elevation + 1702;
  const dast =
    (oat + 15) *
    (-0.00000014 * Math.pow(elevation, 2) + 0.00208 * elevation + 21.79);

  const dasm =
    (3800 - tom) *
    (-0.000000015 * Math.pow(dash + dast, 2) -
      0.000579 * (dash + dast) +
      0.253);
  
  let dasw;

  if (vw === 0) {
    dasw = 0;
  } else if (vw < 0) {
    dasw =
      vw *
      ( 0.00000026* Math.pow(dash + dast + dasm, 2) -
        0.0433 * (dash + dast + dasm) -
        12.61);
  } else {
    dasw =
      vw *
      (0.0000007 * Math.pow(dash + dast + dasm, 2) -
        0.0141 * (dash + dast + dasm) -
        6.35);
  }

  const asdr = Math.round(
    ((dash + dast + dasm + dasw) * contamination * (1 + 0.05 * slope)) / 3.28
  );
    
  return asdr;
  
}


function calculateRemainingStoppingDistance (asda, asdr) {
  const remainingStoppingDistance = asda - asdr;

  return remainingStoppingDistance;
}




function calculateToraValue(tora) {
  const toraValue = tora;
  
  return toraValue;
}

function calculateStopwayValue (asda, tora) {
  const stopwayValue = asda - tora;

  return stopwayValue;
}

function calculateClearwayValue (toda, tora) {
  const clearwayValue = toda - tora;

  return clearwayValue;
}






function calculate() {
  const tora = +document.getElementById("tora").value;
  const toda = +document.getElementById("toda").value;
  const asda = +document.getElementById("asda").value;
  const slope = +document.getElementById("slope").value;
  let contamination = document.getElementById("contamination").value;
  const oat = +document.getElementById("oat").value;
  const vw = +document.getElementById("vw").value;
  const elevation = +document.getElementById("elevation").value;
  const tom = +document.getElementById("tom").value;

  if (contamination === "Dry") {
    contamination = 1;
  } else if (contamination === "Dry, grass") {
    contamination = 1.2;
  } else if (contamination === "Wet, grass") {
    contamination = 1.3;
  } else {
    contamination = 1;
  }



  const todr = calculateTODR(elevation, oat, tom, vw, contamination, slope);
  const factoredRunwayDistance = calculateFactoredRunwayDistance(
    tora,
    toda,
    asda
  );
  const asdr = calculateASDR(elevation, oat, tom, vw, contamination, slope);
  const remainingStoppingDistance = calculateRemainingStoppingDistance(asda, asdr);
  const toraValue = calculateToraValue (tora);
  const stopwayValue = calculateStopwayValue (asda, tora);
  const clearwayValue = calculateClearwayValue (toda, tora);


  const todrResultElement = document.getElementById("todr");
  const factoredRunwayDistanceResultElement = document.getElementById(
    "factored-runway-distance"
  );
  const asdrResultElement = document.getElementById("asdr");
  const remainingStoppingDistanceResultElement = document.getElementById("remaining-stopping-distance");
  const toraValueResultElement = document.getElementById("tora-value");
  const stopwayValueResultElement = document.getElementById("stopway-value");
  const clearwayValueResultElement = document.getElementById("clearway-value");


  todrResultElement.innerText = todr + " m";
  factoredRunwayDistanceResultElement.innerText = factoredRunwayDistance + " m";
  asdrResultElement.innerText = asdr + " m";
  remainingStoppingDistanceResultElement.innerText = remainingStoppingDistance + " m";
  toraValueResultElement.innerText = toraValue + " m";
  stopwayValueResultElement.innerText = stopwayValue + " m";
  clearwayValueResultElement.innerText = clearwayValue + " m";
  

  






}
