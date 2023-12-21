// Get the dropdown elements
var powerSettingDropdown = document.getElementById('ps');
var rpmDropdown = document.getElementById('rpm');

// Attach an event listener to detect changes in the "powerSetting" dropdown
powerSettingDropdown.addEventListener('change', function() {
  // Clear existing options in the "rpm" dropdown
  rpmDropdown.innerHTML = '';

  // Get the selected values of the "powerSetting" and "rpm" dropdowns
  var selectedPowerSetting = powerSettingDropdown.value;

  // Define RPM options based on the selected Power Setting
  var rpmOptions;

  if (selectedPowerSetting === '55' || selectedPowerSetting === '65') {
    rpmOptions = ['2100', '2200', '2300', '2400'];
  } else if (selectedPowerSetting === '75') {
    rpmOptions = ['2200', '2300', '2400', '2500'];
  }

  // Add the RPM options to the "rpm" dropdown
  rpmOptions.forEach(function(optionValue) {
    var option = document.createElement('option');
    option.value = optionValue;
    option.text = optionValue;
    rpmDropdown.add(option);
  });

});

var psDropdown = document.getElementById('ps');
var fuelFlowDiv = document.getElementById('fuel-flow');

// Attach an event listener to detect changes in the "ps" dropdown
psDropdown.addEventListener('change', function() {
  // Get the selected value of the "ps" dropdown
  var selectedPS = psDropdown.value;

  // Set the fuel flow value based on the selected power setting
  var fuelFlowValue;

  if (selectedPS === '55') {
      fuelFlowValue = 8.7;
  } else if (selectedPS === '65') {
      fuelFlowValue = 10.2;
  } else if (selectedPS === '75') {
      fuelFlowValue = 11.7;
  } else {
      fuelFlowValue = ''; // Handle other cases if needed
  }

  // Display the fuel flow value in the "fuel-flow" div
  fuelFlowDiv.textContent = fuelFlowValue;
});



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
applyRangeValidation(document.getElementById('altitude'), 0, 15000);
applyRangeValidation(document.getElementById('dep-ad-elevation'), 0, 4000);
applyRangeValidation(document.getElementById('trip-vw'), -100, 100);
applyRangeValidation(document.getElementById('cruise-fl'), 0, 15000);
applyRangeValidation(document.getElementById('oat-cruise'), -45, 40);
applyRangeValidation(document.getElementById('oat-altitude'), -45, 40);
applyRangeValidation(document.getElementById('dest-ad-elevation'), 0, 4000);
applyRangeValidation(document.getElementById('vw-altn'), -100, 100);
applyRangeValidation(document.getElementById('altn-fl'), 0, 15000);
applyRangeValidation(document.getElementById('oat-altn-cruise'), -45, 40);
applyRangeValidation(document.getElementById('altn-ad-elevation'), 0, 4000);




var psDropdown = document.getElementById('ps');
var rpmDropdown = document.getElementById('rpm');
var depAdOatDropdown = document.getElementById('depadoat');
var destAdOatDropdown = document.getElementById('destadoat');
var altnAdOatDropdown = document.getElementById('altnadoat');

// Attach event listeners to detect changes
psDropdown.addEventListener('change', function() {
  ps.style.backgroundColor = 'lightgreen';
});

rpmDropdown.addEventListener('change', function() {
  rpm.style.backgroundColor = 'lightgreen';
});

depAdOatDropdown.addEventListener('change', function() {
  depadoat.style.backgroundColor = 'lightgreen';
});

destAdOatDropdown.addEventListener('change', function() {
  destadoat.style.backgroundColor = 'lightgreen';
});

altnAdOatDropdown.addEventListener('change', function() {
  altnadoat.style.backgroundColor = 'lightgreen';
});


function calculateRawMap (powerSetting, rpmValue, altitudeValue) {
  if (powerSetting === 55) {
    if (rpmValue === 2100) {
      const rawMap = Math.round((-0.0003 * altitudeValue + 22.232) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2200) {
      const rawMap = Math.round ((-0.0003 * altitudeValue + 21.567) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2300) {
      const rawMap = Math.round((-0.0003 * altitudeValue + 21.025) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2400) {
      const rawMap = Math.round((-0.0002 * altitudeValue + 20.509) *10) / 10;
      return rawMap;
    }
  } else if (powerSetting === 65) {
    if (rpmValue === 2100) {
      const rawMap = Math.round((-0.0003 * altitudeValue + 24.904) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2200) {
      const rawMap = Math.round ((-0.0003 * altitudeValue + 24.158) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2300) {
      const rawMap = Math.round((-0.0003 * altitudeValue + 23.476) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2400) {
      const rawMap = Math.round((-0.0002 * altitudeValue + 22.831) *10) / 10;
      return rawMap;
    }
  } else if (powerSetting === 75) {
    if (rpmValue === 2200) {
      const rawMap = Math.round((-0.0004 * altitudeValue + 26.68) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2300) {
      const rawMap = Math.round ((-0.0003 * altitudeValue + 25.96) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2400) {
      const rawMap = Math.round((-0.0003 * altitudeValue + 25.186) * 10) / 10;
      return rawMap;
    } else if (rpmValue === 2500) {
      const rawMap = Math.round((-0.0002 * altitudeValue + 24.579) *10) / 10;
      return rawMap;
    }
  } 
}

function calculateMap (altitudeValue, oatAltitude, rawMap) {
  const isa = 15 - (0.002 * altitudeValue);
  const isaDev = oatAltitude - isa;
  const map = Math.round ((rawMap * (1 + 0.01 * (isaDev / 8))) * 10) / 10;
  return map;
}
  

function calculateTaxiFuel (taxiFuel) {
  const taxiFuelLiter = Math.round ((3.784 * taxiFuel) * 10) / 10;
  return taxiFuelLiter;
}

function calculateFinResLiter (finResTime){
  const finResLiter = Math.round (((finResTime / 60) * 2 * 8.7 * 3.784) * 10) / 10;
  return finResLiter;
}

function calculateAddFuelLiter (addFuelTime) {
  const addFuelLiter = Math.round(((addFuelTime / 60) * 2 * 8.7 * 3.784) * 10) / 10;
  return addFuelLiter;
}

function calculateExtraFuelLiter (extraFuel) {
  const extraFuelLiter = Math.round ((extraFuel * 3.784) * 10) / 10;
  return extraFuelLiter;
}

function calculateClimbDistance (depAdElevation, depAdOat, cruiseFl, cruiseOat, tripTas, tripVw) {

  const dcdhd = 0.000000073 * Math.pow(depAdElevation, 2) + 0.000536 * depAdElevation + 0.58;
  const dcdtd = (depAdOat + 15 + 0.002 * depAdElevation) * (0.0000000021 * Math.pow(depAdElevation, 2) + 0.00000021 * depAdElevation + 0.0193);

  const dcdhc = 0.000000073 * Math.pow(cruiseFl, 2) + 0.000536 * cruiseFl + 0.58;
  const dcdtc = (cruiseOat + 15 + 0.002 * cruiseFl) * (0.0000000021 * Math.pow(cruiseFl, 2) + 0.00000021 * cruiseFl + 0.0193);

  const climbDistance = Math.round(((dcdhc + dcdtc - dcdhd - dcdtd) * ((tripTas - tripVw ) / tripTas)) * 10) / 10;


  return climbDistance;

}

function calculateClimbFuel (depAdElevation, depAdOat, cruiseFl, cruiseOat) {

  const dcfhd = 0.000000016 * Math.pow(depAdElevation, 2) + 0.000302 * depAdElevation - 0.16;
  const dcftd = (depAdOat + 15 + 0.002 * depAdElevation) * (0.0000062 * depAdElevation - 0.00418);

  const dcfhc = 0.000000016 * Math.pow(cruiseFl, 2) + 0.000302 * cruiseFl - 0.16;
  const dcftc = (cruiseOat + 15 + 0.002 * cruiseFl) * (0.0000062 * cruiseFl - 0.00418);

  const climbFuel = Math.round((dcfhc + dcftc - dcfhd - dcftd) * 3.784 * 10) / 10;
  return climbFuel;
}

function calculateDescentDistance (destAdElevation, destAdOat, cruiseFl, cruiseOat, tripTas, tripVw) {

  const dddhd = 0.000000058 * Math.pow (destAdElevation, 2) + 0.00482 * destAdElevation + 1.14;
  const dddtd = (destAdOat + 15 + 0.002 * destAdElevation) * (0.0000103 * destAdElevation + 0.002182);

  const dddhc = 0.000000058 * Math.pow (cruiseFl, 2) + 0.00482 * cruiseFl + 1.14;
  const dddtc = (cruiseOat + 15 + 0.002 * cruiseFl) * (0.0000103 * cruiseFl + 0.002182);

  const descentDistance = Math.round(((dddhc + dddtc - dddhd - dddtd) * ((tripTas - tripVw ) / tripTas)) * 10) / 10;

  return descentDistance;
}

function calculateDescentFuel (destAdElevation, destAdOat, cruiseFl, cruiseOat) {

  const ddfhd = 0.00047 * destAdElevation + 0.0933;
  const ddftd = (destAdOat + 15 + 0.002 * destAdElevation) * (0.0000007 * destAdElevation + 0.0002424);

  const ddfhc = 0.00047 * cruiseFl + 0.0933;
  const ddftc = (cruiseOat + 15 + 0.002 * cruiseFl) * (0.0000007 * cruiseFl + 0.0002424);

  const descentFuel = Math.round ((ddfhc + ddftc - ddfhd - ddftd) * 3.784 * 10) / 10;
  return descentFuel;
  
}

function calculateCruiseDistance (tripDistance, climbDistance, descentDistance) {

  const cruiseDistance = tripDistance - climbDistance - descentDistance;

  return cruiseDistance;
}

function calculateCruiseFuel (powerSetting, cruiseDistance, tripTas, tripVw) {

  if (powerSetting === 55) {
    const cruiseFuel = Math.round(((- 8.7 * 2 * 3.784 * cruiseDistance) / (tripTas - tripVw)) * 10) / 10;

    return cruiseFuel;
  } else if (powerSetting === 65) {
    const cruiseFuel = Math.round(((- 10.2 * 2 * 3.784 * cruiseDistance) / (tripTas - tripVw)) * 10) / 10;

    return cruiseFuel;
  } else if (powerSetting === 75) {
    const cruiseFuel = Math.round(((- 11.7 * 2 * 3.784 * cruiseDistance) / (tripTas - tripVw)) * 10) / 10;

    return cruiseFuel;
  } else {
    const tripFuel = "!no power setting!";
    return tripFuel;
  }
  
}

function calculateTripFuel (climbFuel, cruiseFuel, descentFuel) {

  const tripFuel = Math.round ((climbFuel + cruiseFuel + descentFuel) * 10) / 10;

  return tripFuel;
}
  
function calculateContFuel (tripFuel) {

  const contingencyFuel = Math.round ((0.05 * tripFuel) * 10) / 10;

  return contingencyFuel;
}

function calculateAltnClimbFuel (destAdElevation, destAdOat, altnCruiseFl, altnCruiseOat) {

  const dcfhdn = 0.000000016 * Math.pow(destAdElevation, 2) + 0.000302 * destAdElevation - 0.16;
  const dcftdn = (destAdOat + 15 + 0.002 * destAdElevation) * (0.0000062 * destAdElevation - 0.00418);

  const dcfhac = 0.000000016 * Math.pow(altnCruiseFl, 2) + 0.000302 * altnCruiseFl - 0.16;
  const dcftac = (altnCruiseOat + 15 + 0.002 * altnCruiseFl) * (0.0000062 * altnCruiseFl - 0.00418);

  const altnClimbFuel = Math.round((dcfhac + dcftac - dcfhdn - dcftdn) * 3.784 * 10) / 10;
  return altnClimbFuel;
}

function calculateAltnClimbDistance (destAdElevation, destAdOat, altnCruiseFl, altnCruiseOat, altnTas, altnVw) {
  const dcdhdn = 0.000000073 * Math.pow(destAdElevation, 2) + 0.000536 * destAdElevation + 0.58;
  const dcdtdn = (destAdOat + 15 + 0.002 * destAdElevation) * (0.0000000021 * Math.pow(destAdElevation, 2) + 0.00000021 * destAdElevation + 0.0193);

  const dcdhac = 0.000000073 * Math.pow(altnCruiseFl, 2) + 0.000536 * altnCruiseFl + 0.58;
  const dcdtac = (altnCruiseOat + 15 + 0.002 * altnCruiseFl) * (0.0000000021 * Math.pow(altnCruiseFl, 2) + 0.00000021 * altnCruiseFl + 0.0193);

  const altnClimbDistance = Math.round (((dcdhac + dcdtac - dcdhdn - dcdtdn) * ((altnTas - altnVw ) / altnTas)) * 10) / 10;
  

  return altnClimbDistance;
}

function calculateAltnDescentFuel (altnAdElevation, altnAdOat, altnCruiseFl, altnCruiseOat) {

  const ddfha = 0.00047 * altnAdElevation + 0.0933;
  const ddfta = (altnAdOat + 15 + 0.002 * altnAdElevation) * (0.0000007 * altnAdElevation + 0.0002424);

  const ddfhac = 0.00047 * altnCruiseFl + 0.0933;
  const ddftac = (altnCruiseOat + 15 + 0.002 * altnCruiseFl) * (0.0000007 * altnCruiseFl + 0.0002424);

  const altnDescentFuel = Math.round ((ddfhac + ddftac - ddfha - ddfta) * 3.784 * 10) / 10;
  return altnDescentFuel;

}

function calculateAltnDescentDistance (altnAdElevation, altnAdOat, altnCruiseFl, altnCruiseOat, altnTas, altnVw) {

  const dddha = 0.000000058 * Math.pow (altnAdElevation, 2) + 0.00482 * altnAdElevation + 1.14;
  const dddta = (altnAdOat + 15 + 0.002 * altnAdElevation) * (0.0000103 * altnAdElevation + 0.002182);

  const dddhac = 0.000000058 * Math.pow (altnCruiseFl, 2) + 0.00482 * altnCruiseFl + 1.14;
  const dddtac = (altnCruiseOat + 15 + 0.002 * altnCruiseFl) * (0.0000103 * altnCruiseFl + 0.002182);

  const altnDescentDistance = Math.round(((dddhac + dddtac - dddha - dddta) * ((altnTas - altnVw ) / altnTas)) * 10) / 10;
  return altnDescentDistance;

}

function calculateAltnCruiseDistance (altnDistance, altnClimbDistance, altnDescentDistance) {

  const altnCruiseDistance = altnDistance - altnClimbDistance - altnDescentDistance;
  return altnCruiseDistance;

}

function calculateAltnCruiseFuel (powerSetting, altnCruiseDistance, altnTas, altnVw) {

  if (powerSetting === 55) {
    const altnCruiseFuel = Math.round (((8.7 * 2 * 3.784 * altnCruiseDistance) / (altnTas - altnVw)) * 10) / 10;

    return altnCruiseFuel;
  } else if (powerSetting === 65) {
    const altnCruiseFuel = Math.round (((10.2 * 2 * 3.784 * altnCruiseDistance) / (altnTas - altnVw)) * 10) / 10;

    return altnCruiseFuel;
  } else if (powerSetting === 75) {
    const altnCruiseFuel = Math.round (((11.7 * 2 * 3.784 * altnCruiseDistance) / (altnTas - altnVw)) * 10) / 10;

    return altnCruiseFuel;
  } else {
    const tripFuel = "!no power setting!";
    return tripFuel;
  }
  
}

function calculateAltnFuel (altnCruiseFuel, altnClimbFuel, altnDescentFuel) {

  const altnFuel = altnCruiseFuel + altnClimbFuel + altnDescentFuel;
  return altnFuel;

}

function calculateTotalFuel (taxiFuelLiter, tripFuel, contingencyFuel, altnFuel, finResLiter, addFuelLiter, extraFuel) {

  const totalFuel = taxiFuelLiter + tripFuel + contingencyFuel + altnFuel + finResLiter + addFuelLiter + extraFuel;

  return totalFuel;
  
}

  

  

function calculate () {

  const powerSetting = +document.getElementById("ps").value;
  const rpmValue = +document.getElementById("rpm").value;
  const altitudeValue = +document.getElementById("altitude").value;
  const oatAltitude = +document.getElementById("oat-altitude").value;
  const taxiFuel = +document.getElementById("taxi").value;
  const finResTime = +document.getElementById("fin-res").value;
  const addFuelTime = +document.getElementById("additional").value;
  const extraFuel = +document.getElementById("extra").value;
  const depAdOat = +document.getElementById("depadoat").value;
  const depAdElevation = +document.getElementById("dep-ad-elevation").value;
  const cruiseFl = +document.getElementById("cruise-fl").value;
  const cruiseOat = +document.getElementById("oat-cruise").value;
  const destAdOat = +document.getElementById("destadoat").value;
  const destAdElevation = +document.getElementById("dest-ad-elevation").value;
  const tripDistance = +document.getElementById("trip-distance").value;
  const tripVw = +document.getElementById("trip-vw").value;
  const tripTas = +document.getElementById("trip-tas").value;
  const fuelFlow = +document.getElementById("fuel-flow").value;
  const altnDistance = +document.getElementById("altn-distance").value;
  const altnCruiseFl = +document.getElementById("altn-fl").value;
  const altnCruiseOat = +document.getElementById("oat-altn-cruise").value;
  const altnAdElevation = +document.getElementById("altn-ad-elevation").value;
  const altnAdOat = +document.getElementById("altnadoat").value;
  const altnVw = +document.getElementById("vw-altn").value;
  const altnTas = +document.getElementById("altn-tas").value;

  
  

  const rawMap = calculateRawMap (powerSetting, rpmValue, altitudeValue);
  const map = calculateMap (altitudeValue, oatAltitude, rawMap);
  const taxiFuelLiter = calculateTaxiFuel (taxiFuel);
  const finResLiter = calculateFinResLiter (finResTime);
  const addFuelLiter = calculateAddFuelLiter (addFuelTime);
  const extraFuelLiter = calculateExtraFuelLiter (extraFuel);
  const climbFuel = calculateClimbFuel (depAdElevation, depAdOat, cruiseFl, cruiseOat);
  const climbDistance = calculateClimbDistance (depAdElevation, depAdOat, cruiseFl, cruiseOat, tripTas, tripVw);
  const descentFuel = calculateDescentFuel (destAdElevation, destAdOat, cruiseFl, cruiseOat);
  const descentDistance = calculateDescentDistance (destAdElevation, destAdOat, cruiseFl, cruiseOat, tripTas, tripVw);
  const cruiseDistance = calculateCruiseDistance (tripDistance, climbDistance, descentDistance);
  const cruiseFuel = calculateCruiseFuel (powerSetting, cruiseDistance, tripVw, tripTas);
  const tripFuel = calculateTripFuel (climbFuel, cruiseFuel, descentFuel);
  const contingencyFuel = calculateContFuel (tripFuel);
  const altnClimbFuel = calculateAltnClimbFuel (destAdElevation, destAdOat, altnCruiseFl, altnCruiseOat);
  const altnClimbDistance = calculateAltnClimbDistance (destAdElevation, destAdOat, altnCruiseFl, altnCruiseOat, altnTas, altnVw);
  const altnDescentFuel = calculateAltnDescentFuel (altnAdElevation, altnAdOat, altnCruiseFl, altnCruiseOat);
  const altnDescentDistance = calculateAltnDescentDistance (altnAdElevation, altnAdOat, altnCruiseFl, altnCruiseOat, altnTas, altnVw);
  const altnCruiseDistance = calculateAltnCruiseDistance (altnDistance, altnClimbDistance, altnDescentDistance);
  const altnCruiseFuel = calculateAltnCruiseFuel (powerSetting, altnCruiseDistance, altnTas, altnVw);
  const altnFuel = calculateAltnFuel (altnCruiseFuel, altnClimbFuel, altnDescentFuel);
  const totalFuel = calculateTotalFuel (taxiFuelLiter, tripFuel, contingencyFuel, altnFuel, finResLiter, addFuelLiter, extraFuel)


  const mapResultElement = document.getElementById("map");
  const taxiFuelLiterResultElement = document.getElementById("taxi-result");
  const finResLiterResultElement = document.getElementById("fin-res-result");
  const addFuelLiterResultElement = document.getElementById("additional-result");
  const extraFuelLiterResultElement = document.getElementById("extra-result");
  const climbFuelResultElement = document.getElementById("climb-result");
  const climbDistanceResultElement = document.getElementById("climb-distance-result");
  const descentFuelResultElement = document.getElementById("descent-result");
  const descentDistanceResultElement = document.getElementById("descent-distance-result");
  const cruiseDistanceResultElement = document.getElementById("cruise-distance-result");
  const cruiseFuelResultElement = document.getElementById("cruise-result");
  const tripFuelResultElement = document.getElementById("trip-result");
  const contingencyFuelResultElement = document.getElementById("cont-result");
  const altnFuelResultElement = document.getElementById("altn-result");
  const totalFuelResultElement = document.getElementById("total-result");


  mapResultElement.innerText = map;
  taxiFuelLiterResultElement.innerText = taxiFuelLiter + " l";
  finResLiterResultElement.innerText = finResLiter + " l";
  addFuelLiterResultElement.innerText = addFuelLiter + " l";
  extraFuelLiterResultElement.innerText = extraFuelLiter + " l";
  climbFuelResultElement.innerText = climbFuel + " l";
  climbDistanceResultElement.innerText = climbDistance + " NGM";
  descentFuelResultElement.innerText = descentFuel + " l";
  descentDistanceResultElement.innerText = descentDistance + " NGM";
  cruiseDistanceResultElement.innerText = cruiseDistance + " NGM";
  cruiseFuelResultElement.innerText = cruiseFuel + " l";
  tripFuelResultElement.innerText = tripFuel + " l";
  contingencyFuelResultElement.innerText = contingencyFuel + " l";
  altnFuelResultElement.innerText = altnFuel + "l";
  totalFuelResultElement.innerText = totalFuel + " liter"; 

  console.log (altnClimbFuel, altnDescentFuel, altnCruiseFuel, altnClimbDistance, altnDescentDistance, altnCruiseDistance);
}
