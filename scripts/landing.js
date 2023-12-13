function calculateLDR(elevation, oat, lm, vw, contamination, slope) {

  const dlah = 0.0000019 * Math.pow(elevation, 2) + 0.0313 * elevation + 1380;

  const dlat = (oat + 15) * (-0.000000045 * Math.pow(elevation, 2) + 0.000364 * elevation + 3.73);
  

  const dlam = (3800 - lm) * (-0.000238 * (dlah + dlat) + 0.0762);

  if (vw === 0) {
    dlaw = 0;
  } else if (vw < 0) {
    dlaw = vw * (0.0000165 * Math.pow((dlah + dlat + dlam), 2) - 0.077 * (dlah + dlat + dlam) + 31.98);
  } else {
    dlaw = vw * (0.00000051 * Math.pow((dlah + dlat + dlam), 2) - 0.0124 * (dlah + dlat + dlam) + 3.256);
  }

  const ldr = Math.round(((dlah + dlat + dlam + dlaw) * contamination * (1 + 0.05 * (slope * (-1))) / 3.28));

  console.log(dlah + dlat + dlam);
  console.log(dlaw);
  return ldr;

  
}

function calculateFactoredRunwayDistance(lda) {
  const factoredRunwayDistance = Math.round(0.7 * lda);

  return factoredRunwayDistance;
}

function calculateRemainingStoppingDistance (ldr, lda) {
  const remainingStoppingDistance = (lda - ldr) * (-1);

  return remainingStoppingDistance;
}



function calculate() {
  const lda = +document.getElementById("lda").value;
  const slope = +document.getElementById("slope").value;
  let contamination = document.getElementById("contamination").value;
  const oat = +document.getElementById("oat").value;
  const vw = +document.getElementById("vw").value;
  const elevation = +document.getElementById("elevation").value;
  const lm = +document.getElementById("lm").value;

  if (contamination === "Dry") {
    contamination = 1;
  } else if (contamination === "Dry, grass") {
    contamination = 1.15;
  } else if (contamination === "Wet, grass") {
    contamination = 1.3225;
  } else {
    contamination = 1.15;
  }

  const ldr = calculateLDR(elevation, oat, lm, vw, contamination, slope);

  const factoredRunwayDistance = calculateFactoredRunwayDistance(lda);

  const remainingStoppingDistance = calculateRemainingStoppingDistance(lda, ldr);



  const ldrResultElement = document.getElementById("ldr");

  const factoredRunwayDistanceResultElement = document.getElementById("factored-runway-distance");

  const remainingStoppingDistanceResultElement = document.getElementById("remaining-stopping-distance");


  ldrResultElement.innerText = ldr + " m";
  factoredRunwayDistanceResultElement.innerText = factoredRunwayDistance + " m";
  remainingStoppingDistanceResultElement.innerText = remainingStoppingDistance + " m";

}