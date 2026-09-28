let flowerPattern = [
  [0, 0, 1, 1, 1, 0, 0], 
  [0, 0, 1, 1, 1, 0, 0], 
  [1, 1, 1, 2, 1, 1, 1], 
  [1, 1, 2, 2, 2, 1, 1], 
  [1, 1, 1, 2, 1, 1, 1], 
  [0, 0, 1, 1, 1, 0, 0], 
  [0, 0, 1, 1, 1, 0, 0], 
  [0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0]
];
  
function drawFlowerPattern(startX, startY) {
  let pSize = 8;
  
  noStroke();
  
  let rows = flowerPattern.length;
  let cols = flowerPattern[0].length;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cell = flowerPattern[row][col];
      
      if (cell === 1) {
        fill(255);
      } else if (cell === 2) {
        fill('#FFFACB'); 
      } else if (cell === 3) {
        fill(125, 173, 125); 
      } else {
        continue;
      }
      rect(startX + col * pSize, startY + row * pSize, pSize, pSize);
    }
  }
}