function applyRangeValidation(inputElement, minValue, maxValue) {
  inputElement.addEventListener('input', function() {
      var inputValue = inputElement.value.trim();

      // Check if the input is empty
      if (inputValue === '') {
          inputElement.style.backgroundColor = '';
          return; // Exit the function early
      }

      // Parse the input value to a float
      inputValue = parseFloat(inputValue);

      // Check if the value is within the range
      if (!isNaN(inputValue) && inputValue >= minValue && inputValue <= maxValue) {
          // Set background color to green if within range
          inputElement.style.backgroundColor = 'lightgreen';
      } else {
          // Set background color to red if outside range
          inputElement.style.backgroundColor = 'lightcoral';
      }
  });
}

// Apply range validation for each input field
applyRangeValidation(document.getElementById('elevation'), 0, 4000);
applyRangeValidation(document.getElementById('tora'), 500, 4000);
applyRangeValidation(document.getElementById('toda'), 500, 4000);
applyRangeValidation(document.getElementById('asda'), 500, 4000);
applyRangeValidation(document.getElementById('slope'), 0, 2);
applyRangeValidation(document.getElementById('tom'), 2750, 3800);

var oatDropdown = document.getElementById('oat');
var vwDropdown = document.getElementById('vw');
var contaminationDropdown = document.getElementById('contamination');

// Attach event listeners to detect changes
oatDropdown.addEventListener('change', function() {
  oat.style.backgroundColor = 'lightgreen';
});

vwDropdown.addEventListener('change', function() {
  vw.style.backgroundColor = 'lightgreen';
});   

contaminationDropdown.addEventListener('change', function() {
  contamination.style.backgroundColor = 'lightgreen';
});   


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

function calculateFactoredRunwayDistance(tora, toda) {
  if (tora === toda) {
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

function calculatepltom1Value (asda, slope, contamination, vw, elevation, oat) {

  const asda1 = (asda / (1 + 0.05 * slope)) * 3.28 / contamination;

  let dasw;

  if (vw === 0) {
    dasw = 0;
  } else if (vw < 0) {
    dasw =
      vw *
      ( 0.00000026* Math.pow(asda1, 2) -
        0.0433 * (asda1) -
        12.61);
  } else {
    dasw =
      vw *
      (0.0000007 * Math.pow(asda1, 2) -
        0.0141 * (asda1) -
        6.35);
  }

  const asdr1 = asda1 - dasw;

  const dash = 0.0000079 * Math.pow(elevation, 2) + 0.1856 * elevation + 1702;
  const dast =(oat + 15) * (-0.00000014 * Math.pow(elevation, 2) + 0.00208 * elevation + 21.79);
  
  const asdr2 =  dash + dast;

  const dasm = asdr1 - asdr2;
  



  if (dasm >= 0) {
    const pltom1 = 3800;
    return pltom1;
    

  } else {
    const pltom1 = 3800 - (dasm / (-0.000000015 * Math.pow(dash + dast, 2) - 0.000579 * (dash + dast) + 0.253));
    return pltom1;
  }


}



function calculatepltom2Value (factoredRunwayDistance, slope, contamination, vw, elevation, oat) {
  const factoredRunwayDistance1 = (factoredRunwayDistance / (1 + 0.05 * slope)) * 3.28 / contamination;

  if (vw === 0) {
    dtow = 0;
  } else if (vw < 0) {
    dtow =
      vw *
      (0.000004 * Math.pow(factoredRunwayDistance1, 2) -
        0.0436 * (factoredRunwayDistance1) -
        10.5);
  } else {
    dtow =
      vw *
      (0.00000033 * Math.pow(factoredRunwayDistance1, 2) -
        0.008 * (factoredRunwayDistance1) -
        10.667);
  }

  const todr1 = factoredRunwayDistance1 - dtow;

  const dtoh = 0.0000125 * Math.pow(elevation, 2) + 0.155 * elevation + 1720;
  const dtot =
    (oat + 15) *
    (0.0000002 * Math.pow(elevation, 2) + 0.00195 * elevation + 18);

  const todr2 = dtoh + dtot;

  const dtom = todr1 - todr2;

  console.log(factoredRunwayDistance1, dtow, todr1, dtoh, dtot, todr2, dtom)

  if (dtom >= 0) {
    const pltom2 = 3800;
    return pltom2;

  } else if (dtom < 1450) {
    const pltom2 = 3800 - ( dtom / (-0.00000017 * Math.pow(dtoh + dtot, 2) +
    0.00017688 * (dtoh + dtot) -
    1.49));
    return pltom2;
    
  } else {
    const pltom2 = 3350 - ((dtom - 450 *
      (-0.00000017 * Math.pow(dtoh + dtot, 2) +
        0.00017688 * (dtoh + dtot) -
        1.49)) / (0.000000007 * Math.pow(dtoh + dtot, 2) -
        0.000618 * (dtoh + dtot) +
        0.0552));
    return pltom2;
  }


}



function calculateRtomValue (pltom1, pltom2) {
  const rtomValue = Math.round(Math.max (pltom1, pltom2));
  
  return rtomValue;

}

function changeFrDistanceWidth(tora, factoredRunwayDistance) {

  var frDistance = document.getElementById("fr-distance");

    
  var newWidth = (factoredRunwayDistance / tora) * 600 + "px";
  frDistance.style.width = newWidth;

    
}

function changeTodrWidth (todr, tora) {

  var toDistance = document.getElementById("to-distance");

    
  var newWidth = (todr / tora) * 600 + "px";
  toDistance.style.width = newWidth;

}

function changeAsdrWidth (asdr, tora) {

  var asDistance = document.getElementById("as-distance");

    
  var newWidth = (asdr / tora) * 600 + "px";
  asDistance.style.width = newWidth;

}


function changeStopwayWidth (asda, tora) {

  var stopwayDiv = document.getElementById("stopway");

    
  var newWidth = ((asda - tora) / tora) * 600 + "px";
  stopwayDiv.style.width = newWidth;

}

function changeClearwayWidth (toda, tora) {

  var clearwayDiv = document.getElementById("clearway");

    
  var newWidth = ((toda - tora) / tora) * 600 + "px";
  clearwayDiv.style.width = newWidth;

}



function saveResult(rtomValue) {
  const fltomResult = rtomValue;
  localStorage.setItem('fltomResult', fltomResult);
  console.log(fltomResult);
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
  const pltom1 = calculatepltom1Value (asda, slope, contamination, vw, elevation, oat);
  const pltom2 = calculatepltom2Value (factoredRunwayDistance, slope, contamination, vw, elevation, oat);
  const rtomValue = calculateRtomValue (pltom1, pltom2);
  const fltomResult = saveResult (rtomValue);
  const frDistanceWidth = changeFrDistanceWidth (tora, factoredRunwayDistance);
  const todrWidth = changeTodrWidth (todr, tora);
  const stopwayWidth = changeStopwayWidth (asda, tora);
  const clearwayWidth = changeClearwayWidth (toda, tora);
  const asdrWidth = changeAsdrWidth (asdr, tora);


  const todrResultElement = document.getElementById("todr");
  const factoredRunwayDistanceResultElement = document.getElementById(
    "factored-runway-distance"
  );
  const asdrResultElement = document.getElementById("asdr");
  const remainingStoppingDistanceResultElement = document.getElementById("remaining-stopping-distance");
  const toraValueResultElement = document.getElementById("tora-value");
  const stopwayValueResultElement = document.getElementById("stopway-value");
  const clearwayValueResultElement = document.getElementById("clearway-value");
  const rtomValueResultElement = document.getElementById("rtom");


  todrResultElement.innerText = todr + " m";
  factoredRunwayDistanceResultElement.innerText = factoredRunwayDistance + " m";
  asdrResultElement.innerText = asdr + " m";
  remainingStoppingDistanceResultElement.innerText = remainingStoppingDistance + " m";
  toraValueResultElement.innerText = "TORA= " + toraValue + " m";
  stopwayValueResultElement.innerText = "SWY= " + stopwayValue + " m";
  clearwayValueResultElement.innerText = "CWY= " + clearwayValue + " m";
  rtomValueResultElement.innerText = rtomValue + " lbs";


}






