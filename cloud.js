let cloudPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 1, 1, 1, 0], 
  [0, 1, 1, 1, 1, 1, 1, 0], 
  [1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1], 
  [0, 1, 1, 1, 1, 1, 1, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0]
];
  
function drawCloudPattern(startX, startY) {
  let pSize = 8;
  noStroke();
  fill(255);
  
  let rows = cloudPattern.length;
  let cols = cloudPattern[0].length;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (cloudPattern[j][i] === 1) {
        rect(startX + i * pSize, startY + j * pSize, pSize, pSize);
      }
    }
  }  
}