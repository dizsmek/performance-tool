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
applyRangeValidation(document.getElementById('elevation-to'), 0, 5500);
applyRangeValidation(document.getElementById('elevation-ldg'), 0, 5500);
applyRangeValidation(document.getElementById('cruise-fl'), 0, 15000);
applyRangeValidation(document.getElementById('oat-cruise'), -45, 45);
applyRangeValidation(document.getElementById('cruise-mass'), 2750, 3800);
applyRangeValidation(document.getElementById('tom'), 2750, 3800);
applyRangeValidation(document.getElementById('lm'), 2750, 3800);
applyRangeValidation(document.getElementById('vw-cruise'), -100, 100);


var oattoDropdown = document.getElementById('oat-to');
var vwtoDropdown = document.getElementById('vw-to');
var oatldgDropdown = document.getElementById('oat-ldg');
var vwldgDropdown = document.getElementById('vw-ldg');

// Attach event listeners to detect changes
oattoDropdown.addEventListener('change', function() {
  oattoDropdown.style.backgroundColor = 'lightgreen';
});

vwtoDropdown.addEventListener('change', function() {
  vwtoDropdown.style.backgroundColor = 'lightgreen';
});   

oatldgDropdown.addEventListener('change', function() {
  oatldgDropdown.style.backgroundColor = 'lightgreen';
});

vwldgDropdown.addEventListener('change', function() {
  vwldgDropdown.style.backgroundColor = 'lightgreen';
});



function calculateaeoGearDownToRoc(elevationto, oatto, tom) {
  
  const dadh = 0.0000015 * Math.pow(elevationto, 2) - 0.1267 * elevationto + 1541;

  const dadt = (oatto + 15) * (-0.000000021 * Math.pow(elevationto, 2) + 0.000485 * elevationto - 11.45);

  const dadm = (3800 - tom) * (0.000000033 * Math.pow((dadh + dadt), 2) + 0.000193 * (dadh + dadt) + 0.339);

  const aeoGearDownToRoc = Math.round(dadh + dadt + dadm);
  
  return aeoGearDownToRoc;
}

function calculateaeoGearUpToRoc (elevationto, oatto, tom) {

  const dauh = 0.000002 * Math.pow(elevationto, 2) - 0.1255 * elevationto + 1682;

  const daut = (oatto + 15) * (-0.000000022 * Math.pow(elevationto, 2) + 0.000651 * elevationto - 13.042);

  const daum = (3800 - tom) * (0.00000015 * Math.pow((dauh + daut), 2) + 0.000018 * (dauh + daut) + 0.366);

  const aeoGearUpToRoc = Math.round(dauh + daut + daum);

  return aeoGearUpToRoc;
}

function calculateoeiGearUpToRoc (elevationto, oatto, tom) {

  const douh = -0.0000014 * Math.pow(elevationto, 2) - 0.0426 * elevationto + 331;

  const dout = (oatto + 15) * (0.000000037 * Math.pow(elevationto, 2) - 0.000157 * elevationto - 4.682);

  const doum = (3800 - tom) * (-0.0000001 * Math.pow((douh + dout), 2) + 0.000267 * (douh + dout) + 0.246);

  const oeiGearUpToRoc = Math.round(douh + dout + doum);

  return oeiGearUpToRoc;
}

function calculateaeoGearDownTo(aeoGearDownToRoc, vwto, elevationto) {

  const aeoGearDownTo = Math.round((aeoGearDownToRoc * 6000) / ((78 * (1 + 0.00002 * elevationto) - vwto) * 6080) * 10) / 10;
  
  return aeoGearDownTo;

}

function calculateaeoGearUpTo (aeoGearUpToRoc, vwto, elevationto) {

  const aeoGearUpTo = Math.round((aeoGearUpToRoc * 6000) / ((88 * (1 + 0.00002 * elevationto) - vwto) * 6080)* 10) / 10;
  
  return aeoGearUpTo;
}

function calculateoeiGearUpTo (oeiGearUpToRoc, vwto, elevationto) {

  const oeiGearUpTo = Math.round((oeiGearUpToRoc * 6000) / ((88 * (1 + 0.00002 * elevationto) - vwto) * 6080)* 10) / 10;

  return oeiGearUpTo;
}


function calculateaeoCruiseRoc(cruisefl, oatcruise, cruisemass) {
  
  const dauh = 0.000002 * Math.pow(cruisefl, 2) - 0.1255 * cruisefl + 1682;

  const daut = (oatcruise + 0.002 * cruisefl + 15) * (-0.000000022 * Math.pow(cruisefl, 2) + 0.000651 * cruisefl - 13.042);

  const daum = (3800 - cruisemass) * (0.00000015 * Math.pow((dauh + daut), 2) + 0.000018 * (dauh + daut) + 0.366);

  const aeoCruiseRoc = Math.round(dauh + daut + daum);

  return aeoCruiseRoc;

}

function calculateaeoGearUpCruise(aeoCruiseROC, vwcruise, cruisefl) {

  const aeoGearUpCruise = Math.round((aeoCruiseROC * 6000) / ((88 * (1 + 0.00002 * cruisefl) - vwcruise) * 6080)* 10) / 10;
  
  return aeoGearUpCruise;
}

function calculateoeiCruiseRoc(cruisefl, oatcruise, cruisemass) {

  const douh = -0.0000014 * Math.pow(cruisefl, 2) - 0.0426 * cruisefl + 331;

  const dout = (oatcruise + 0.002 * cruisefl + 15) * (0.000000037 * Math.pow(cruisefl, 2) - 0.000157 * cruisefl - 4.682);

  const doum = (3800 - cruisemass) * (-0.0000001 * Math.pow((douh + dout), 2) + 0.000267 * (douh + dout) + 0.246);

  const oeiCruiseRoc = Math.round(douh + dout + doum);

  return oeiCruiseRoc;

}

function calculateoeiGearUpCruise(oeiCruiseRoc, vwcruise, cruisefl) {

  const oeiGearUpCruise = Math.round((oeiCruiseRoc * 6000) / ((88 * (1 + 0.00002 * cruisefl) - vwcruise) * 6080)* 10) / 10;

  return oeiGearUpCruise;

}


function calculateaeoGearDownLdgRoc(elevationldg, oatldg, lm) {
  
  const dadh = 0.0000015 * Math.pow(elevationldg, 2) - 0.1267 * elevationldg + 1541;

  const dadt = (oatldg + 15) * (-0.000000021 * Math.pow(elevationldg, 2) + 0.000485 * elevationldg - 11.45);

  const dadm = (3800 - lm) * (0.000000033 * Math.pow((dadh + dadt), 2) + 0.000193 * (dadh + dadt) + 0.339);

  const aeoGearDownLdgRoc = Math.round(dadh + dadt + dadm);
  
  return aeoGearDownLdgRoc;
}

function calculateaeoGearUpLdgRoc (elevationldg, oatldg, lm) {

  const dauh = 0.000002 * Math.pow(elevationldg, 2) - 0.1255 * elevationldg + 1682;

  const daut = (oatldg + 15) * (-0.000000022 * Math.pow(elevationldg, 2) + 0.000651 * elevationldg - 13.042);

  const daum = (3800 - lm) * (0.00000015 * Math.pow((dauh + daut), 2) + 0.000018 * (dauh + daut) + 0.366);

  const aeoGearUpLdgRoc = Math.round(dauh + daut + daum);

  return aeoGearUpLdgRoc;
}

function calculateoeiGearUpLdgRoc (elevationldg, oatldg, lm) {

  const douh = -0.0000014 * Math.pow(elevationldg, 2) - 0.0426 * elevationldg + 331;

  const dout = (oatldg + 15) * (0.000000037 * Math.pow(elevationldg, 2) - 0.000157 * elevationldg - 4.682);

  const doum = (3800 - lm) * (-0.0000001 * Math.pow((douh + dout), 2) + 0.000267 * (douh + dout) + 0.246);

  const oeiGearUpLdgRoc = Math.round(douh + dout + doum);

  return oeiGearUpLdgRoc;
}

function calculateaeoGearDownLdg(aeoGearDownLdgRoc, vwldg, elevationldg) {

  const aeoGearDownLdg = Math.round((aeoGearDownLdgRoc * 6000) / ((78 * (1 + 0.00002 * elevationldg) - vwldg) * 6080) * 10) / 10;
  
  return aeoGearDownLdg;

}

function calculateaeoGearUpLdg (aeoGearUpLdgRoc, vwldg, elevationldg) {

  const aeoGearUpLdg = Math.round((aeoGearUpLdgRoc * 6000) / ((88 * (1 + 0.00002 * elevationldg) - vwldg) * 6080)* 10) / 10;
  
  return aeoGearUpLdg;
}

function calculateoeiGearUpLdg (oeiGearUpLdgRoc, vwldg, elevationldg) {

  const oeiGearUpLdg = Math.round((oeiGearUpLdgRoc * 6000) / ((88 * (1 + 0.00002 * elevationldg) - vwldg) * 6080)* 10) / 10;

  return oeiGearUpLdg;
}


function calculatePltomAeo (aeoToGradient, elevationto, oatto,vwto) {

  const pltomAeoRoc1 = aeoToGradient / 0.77 * (88 * (1 + 0.00002 * elevationto) - vwto) * 6080 / 6000;

  const dauh = 0.000002 * Math.pow(elevationto, 2) - 0.1255 * elevationto + 1682;

  const daut = (oatto + 15) * (-0.000000022 * Math.pow(elevationto, 2) + 0.000651 * elevationto - 13.042);

  const pltomAeoRoc2 = dauh + daut;
  

  const daum = pltomAeoRoc1 - pltomAeoRoc2;

  if (daum <= 0) {
    const pltomAeo = 3800;
    return pltomAeo;
    
  } else {
    const pltomAeo = Math.round(3800 - (daum / (0.00000015 * Math.pow((dauh + daut), 2) + 0.000018 * (dauh + daut) + 0.366)));
    return pltomAeo;
  }
  
}


function calculatePltomOei (elevationto, oatto, vwto) {

  const pltomOeiRoc1 = 0.75 * (88 * (1 + 0.00002 * (elevationto + 1500)) - vwto) * 6080 / 6000;

  const douh = -0.0000014 * Math.pow((elevationto + 1500), 2) - 0.0426 * (elevationto + 1500) + 331;

  const dout = (oatto + 12) * (0.000000037 * Math.pow((elevationto + 1500), 2) - 0.000157 * (elevationto + 1500) - 4.682);

  const pltomOeiRoc2 = douh + dout;

  const doum = pltomOeiRoc1 - pltomOeiRoc2;
  

  if (doum <= 0) {
    const pltomOei = 3800;
    return pltomOei;
  } else {
    const pltomOei = Math.round(3800 - (doum / (-0.0000001 * Math.pow((douh + dout), 2) + 0.000267 * (douh + dout) + 0.246)));
    return pltomOei;
  }

}

function calculatePllmAeo (aeoLdgGradient, elevationldg, oatldg, vwldg) {

  const pllmAeoRoc1 = aeoLdgGradient * (88 * (1 + 0.00002 * elevationldg) - vwldg) * 6080 / 6000;

  const dadh = 0.0000015 * Math.pow(elevationldg, 2) - 0.1267 * elevationldg + 1541;

  const dadt = (oatldg + 15) * (-0.000000021 * Math.pow(elevationldg, 2) + 0.000485 * elevationldg - 11.45);

  const pllmAeoRoc2 = dadh + dadt;

  const dadm = pllmAeoRoc1 - pllmAeoRoc2;
  console.log(pllmAeoRoc1, dadh, dadt, pllmAeoRoc2, dadm);

  if (dadm <= 0) {
    const pllmAeo = 3800;
    return pllmAeo;
  } else {
    const pllmAeo = Math.round(3800 - (dadm / (0.000000033 * Math.pow((dadh + dadt), 2) + 0.000193 * (dadh + dadt) + 0.339)));
    return pllmAeo;
  }

}

function calculatePllmOei (elevationldg, oatldg, vwldg) {

  const pllmOeiRoc1 = 0.75 * (88 * (1 + 0.00002 * (elevationldg + 1500)) - vwldg) * 6080 / 6000;

  const douh = -0.0000014 * Math.pow((elevationldg + 1500), 2) - 0.0426 * (elevationldg + 1500) + 331;

  const dout = (oatldg + 12) * (0.000000037 * Math.pow((elevationldg + 1500), 2) - 0.000157 * (elevationldg + 1500) - 4.682);

  const pllmOeiRoc2 = douh + dout;

  const doum = pllmOeiRoc1 - pllmOeiRoc2;

  if (doum <= 0) {
    const pllmOei = 3800;
    return pllmOei;
  } else {
    const pllmOei = Math.round(3800 - (doum / (-0.0000001 * Math.pow((douh + dout), 2) + 0.000267 * (douh + dout) + 0.246)));
    return pllmOei;
  }

}

function saveResultTo(pltomAeo, pltomOei) {
  const pltomAeoResult = pltomAeo;
  localStorage.setItem('pltomAeoResult', pltomAeoResult);
  const pltomOeiResult = pltomOei;
  localStorage.setItem('pltomOeiResult', pltomOeiResult);
  
}

function saveResultLdg(pllmAeo, pllmOei) {
  const pllmAeoResult = pllmAeo;
  localStorage.setItem('pllmAeoResult', pllmAeoResult);
  const pllmOeiResult = pllmOei;
  localStorage.setItem('pllmOeiResult', pllmOeiResult);
}




function calculateTo () {
  const elevationto = +document.getElementById("elevation-to").value;
  const oatto = +document.getElementById("oat-to").value;
  const vwto = +document.getElementById("vw-to").value;
  const tom = +document.getElementById("tom").value;
  let aeoToGradient = +document.getElementById("aeo-to-gradient").value;

  if (aeoToGradient === 0) {
    aeoToGradient = 4;
  } else {
    aeoToGradient = aeoToGradient; 
  }

  const aeoGearDownToRoc = calculateaeoGearDownToRoc(elevationto, oatto, tom);
  const aeoGearDownTo = calculateaeoGearDownTo(aeoGearDownToRoc, vwto, elevationto);

  const aeoGearUpToRoc = calculateaeoGearUpToRoc(elevationto, oatto, tom);
  const aeoGearUpTo = calculateaeoGearUpTo(aeoGearUpToRoc, vwto, elevationto);

  const oeiGearUpToRoc = calculateoeiGearUpToRoc(elevationto, oatto, tom);
  const oeiGearUpTo = calculateoeiGearUpTo(oeiGearUpToRoc, vwto, elevationto);

  const pltomAeo = calculatePltomAeo (aeoToGradient, elevationto, oatto,vwto);
  const pltomOei = calculatePltomOei (elevationto, oatto, vwto);

  const pltomResult = saveResultTo (pltomAeo, pltomOei);


  const aeoGearDownToRocResultElement = document.getElementById("aeo-gear-down-to-roc");
  const aeoGearDownToResultElement = document.getElementById("aeo-gear-down-to");

  const aeoGearUpToRocResultElement = document.getElementById("aeo-gear-up-to-roc");
  const aeoGearUpToResultElement = document.getElementById("aeo-gear-up-to");

  const oeiGearUpToRocResultElement = document.getElementById("oei-gear-up-to-roc");
  const oeiGearUpToResultElement = document.getElementById("oei-gear-up-to");

  const pltomAeoResultElement = document.getElementById("aeo-pltom");
  const pltomOeiResultElement = document.getElementById("oei-pltom");



  aeoGearDownToRocResultElement.innerText = aeoGearDownToRoc + " fpm";
  aeoGearDownToResultElement.innerText = aeoGearDownTo + " %";

  aeoGearUpToRocResultElement.innerText = aeoGearUpToRoc + " fpm";
  aeoGearUpToResultElement.innerText = aeoGearUpTo + " %";

  oeiGearUpToRocResultElement.innerText = oeiGearUpToRoc + " fpm";
  oeiGearUpToResultElement.innerText = oeiGearUpTo + " %";

  pltomAeoResultElement.innerText = pltomAeo + " lbs";
  pltomOeiResultElement.innerText = pltomOei + " lbs";

}

function calculateCruise () {
  const cruisefl = +document.getElementById("cruise-fl").value;
  const oatcruise = +document.getElementById("oat-cruise").value;
  const vwcruise = +document.getElementById("vw-cruise").value;
  const cruisemass = +document.getElementById("cruise-mass").value;


  const aeoCruiseROC = calculateaeoCruiseRoc(cruisefl, oatcruise, cruisemass);
  const aeoGearUpCruise = calculateaeoGearUpCruise(aeoCruiseROC, vwcruise, cruisefl);

  const oeiCruiseRoc = calculateoeiCruiseRoc(cruisefl, oatcruise, cruisemass);
  const oeiGearUpCruise = calculateoeiGearUpCruise(oeiCruiseRoc, vwcruise, cruisefl);


  const aeoCruiseROCResultElement = document.getElementById("aeo-cruise-roc");
  const aeoGearUpCruiseResultElement = document.getElementById("aeo-gear-up-cruise");

  const oeiCruiseRocResultElement = document.getElementById("oei-cruise-roc");
  const oeiGearUpCruiseResultElement = document.getElementById("oei-gear-up-cruise");


  aeoCruiseROCResultElement.innerText = aeoCruiseROC + " fpm";
  aeoGearUpCruiseResultElement.innerText = aeoGearUpCruise + " %";

  oeiCruiseRocResultElement.innerText = oeiCruiseRoc + " fpm";
  oeiGearUpCruiseResultElement.innerText = oeiGearUpCruise + " %";

}

function calculateLdg () {
  const elevationldg = +document.getElementById("elevation-ldg").value;
  const oatldg = +document.getElementById("oat-ldg").value;
  const vwldg = +document.getElementById("vw-ldg").value;
  const lm = +document.getElementById("lm").value;
  let aeoLdgGradient = +document.getElementById("aeo-ldg-gradient").value;

  if (aeoLdgGradient === 0) {
    aeoLdgGradient = 2.5;
  } else {
    aeoLdgGradient = aeoLdgGradient; 
  }

  const aeoGearDownLdgRoc = calculateaeoGearDownLdgRoc(elevationldg, oatldg, lm);
  const aeoGearDownLdg = calculateaeoGearDownLdg(aeoGearDownLdgRoc, vwldg, elevationldg);

  const aeoGearUpLdgRoc = calculateaeoGearUpLdgRoc(elevationldg, oatldg, lm);
  const aeoGearUpLdg = calculateaeoGearUpLdg(aeoGearUpLdgRoc, vwldg, elevationldg);

  const oeiGearUpLdgRoc = calculateoeiGearUpLdgRoc(elevationldg, oatldg, lm);
  const oeiGearUpLdg = calculateoeiGearUpLdg(oeiGearUpLdgRoc, vwldg, elevationldg);

  const pllmAeo = calculatePllmAeo (aeoLdgGradient, elevationldg, oatldg, vwldg);
  const pllmOei = calculatePllmOei (elevationldg, oatldg, vwldg);

  const pllmResult = saveResultLdg (pllmAeo, pllmOei);


  const aeoGearDownLdgRocResultElement = document.getElementById("aeo-gear-down-ldg-roc");
  const aeoGearDownLdgResultElement = document.getElementById("aeo-gear-down-ldg");

  const aeoGearUpLdgRocResultElement = document.getElementById("aeo-gear-up-ldg-roc");
  const aeoGearUpLdgResultElement = document.getElementById("aeo-gear-up-ldg");

  const oeiGearUpLdgRocResultElement = document.getElementById("oei-gear-up-ldg-roc");
  const oeiGearUpLdgResultElement = document.getElementById("oei-gear-up-ldg");

  const pllmAeoResultElement = document.getElementById("aeo-pllm");
  const pllmOeiResultElement = document.getElementById("oei-pllm");



  aeoGearDownLdgRocResultElement.innerText = aeoGearDownLdgRoc + " fpm";
  aeoGearDownLdgResultElement.innerText = aeoGearDownLdg + " %";

  aeoGearUpLdgRocResultElement.innerText = aeoGearUpLdgRoc + " fpm";
  aeoGearUpLdgResultElement.innerText = aeoGearUpLdg + " %";

  oeiGearUpLdgRocResultElement.innerText = oeiGearUpLdgRoc + " fpm";
  oeiGearUpLdgResultElement.innerText = oeiGearUpLdg + " %";

  pllmAeoResultElement.innerText = pllmAeo + " lbs";
  pllmOeiResultElement.innerText = pllmOei + " lbs";
}