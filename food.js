class Food {
  constructor(volume) {
    this.mushroomPattern = [
      [0, 0, 1, 1, 1, 1, 0, 0], 
      [0, 1, 2, 1, 1, 1, 1, 0],
      [1, 1, 1, 2, 1, 2, 1, 1], 
      [1, 1, 2, 1, 1, 1, 2, 1], 
      [0, 1, 1, 1, 1, 1, 1, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0]  
    ];
    
    this.x = floor(random(50, width - 50) / 10) * 10; 
    this.y = -20;
    
    let mappedWidth = map(volume, threshold, 0.8, 40, 320);
    this.w = constrain(mappedWidth, 40, 320);
    this.h = this.w;
    this.fallTime = 0;
    this.fallInterval = 80;
    this.fallSpeed = 5;
  }
  
  update() { 
    if (this.y < 350 - this.h / 2) {
      this.y += this.fallSpeed;
      if (this.y > 350 - this.h / 2) {
        this.y = 350 - this.h / 2;
      }
      this.fallTime = millis() + this.fallInterval;
    }
  }
  
  show() {
    let pSize = this.w / 8;
    
    noStroke();
    rectMode(CORNER);
    
    push();
    translate(this.x - this.w / 2, this.y - this.h / 2);
    
    //--------------mushrooms' color setting--------------
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let cell = this.mushroomPattern[row][col];
        
        if (cell === 1) {
          fill(226, 92, 92); 
        } else if (cell === 2) {
          fill(255); 
        } else if (cell === 3) {
          fill(240, 230, 210); 
        } else {
          continue; 
        }
        rect(col * pSize, row * pSize, pSize, pSize);
      }
    }
    //-----------------------------------------------------
    
    pop(); 
  }
  
  hits(m) {
    let d = dist(this.x, this.y, m.x, m.y);
    return d < (this.w / 2 + m.size / 2 * 0.8); 
  }
}