/*monster.js file draw different patterns for monster and the statement when it becomes fat and dead*/

class Monster {
  //setting up the place when monster is born
  constructor() {
    this.monsterPattern = [//basic monster
      [0, 0, 1, 1, 1, 1, 0, 0], 
      [0, 1, 1, 1, 1, 1, 1, 0], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [0, 1, 1, 0, 0, 1, 1, 0], 
      [1, 1, 0, 0, 0, 0, 1, 1]
    ];
    
    this.fatPattern = [
      [0, 0, 4, 4, 4, 4, 0, 0], 
      [0, 4, 2, 4, 4, 4, 4, 0],
      [4, 4, 4, 2, 4, 2, 4, 4], 
      [4, 4, 2, 4, 4, 4, 2, 4], 
      [0, 4, 4, 4, 4, 4, 4, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0], 
      [0, 0, 0, 3, 3, 0, 0, 0], 
      [0, 1, 1, 1, 1, 1, 1, 0], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [0, 1, 1, 0, 0, 1, 1, 0], 
      [1, 1, 0, 0, 0, 0, 1, 1]
    ];
    
    this.deadPattern = [
      [0, 0, 0, 3, 3, 0, 0, 0],
      [0, 0, 0, 3, 3, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 5, 5, 1, 1, 5, 5, 1],
      [1, 1, 1, 1, 1, 1, 1, 1], 
      [1, 1, 1, 5, 5, 1, 1, 1], 
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 1]  
    ];
    //the whole setting (place, size, speed)for the monster in the biginning
    this.x = width / 2;
    this.y = 300;
    this.size = 64; 
    this.speed = 30.0; 
    this.isEating = false;
    this.eatTimer = 0; 
    this.moveTimer = 0; // make a choppy movement
    this.moveInterval = 200;
    this.eatenCounter = 0;
    this.isFat = false;
    this.isDead = false;
    
    this.currentPattern = this.monsterPattern;
  }
  
  update() {
    if (this.isDead) return;
     
    if (this.isEating && millis() > this.eatTimer) {
      this.isEating = false;
    }

    
/* in order to make a choppy movement, moveTimer, speed and moveInterval are used to control the delay move animate */
    
    if (millis() > this.moveTimer) {
      this.x += this.speed;
      
      if (this.x + this.speed + this.size / 2 > width || this.x + this.speed - this.size / 2 < 0) {
//if the monster hit the margin, the monser will go to the opposite way
        this.speed *= -1; 
      }

      this.moveTimer = millis() + this.moveInterval;
    }
  }
  
  show() {
    push(); 
    
    if (this.isDead) {
      translate(0, -50);
    } else {
      translate(this.x, this.y); 
 
      if (this.speed < 0) {
        scale(-1.0, 1.0);
      }
      
      let startY;
      if (this.isFat === true) { 
        startY = -this.size * 1.5;
      } else {
        startY = -this.size / 2;
      }
      
      translate(-this.size / 2, startY);
    }
    
    let pSize = this.size / 8;
    
    noStroke();

    //-----------monster's color setting-----------
    let rows = this.currentPattern.length;
    let cols = this.currentPattern[0].length;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = this.currentPattern[j][i];
        
        if (cell === 1) fill(154, 154, 154);      
        else if (cell === 2) fill(255);            
        else if (cell === 3) fill(240, 230, 210);
        else if (cell === 4) fill(226, 92, 92);  
        else if (cell === 5) fill(0);
        
        if (cell !== 0) {
          rect(i * pSize, j * pSize, pSize, pSize);
        }
      }
    }
    //-----------pixel setting for the monster------------------------------------

    if (!this.isDead) {
      let faceOffset;
      
      if (this.isFat === true) {
        faceOffset = 8;
      } else {
        faceOffset = 0;
      }
     
      fill(0); 
      rect(2 * pSize, (2 + faceOffset) * pSize, pSize, pSize);
      rect(5 * pSize, (2 + faceOffset) * pSize, pSize, pSize);
      
      fill(0);
      if (this.isEating) {
        rect(3 * pSize, (3 + faceOffset) * pSize, 2 * pSize, 2 * pSize);
      } else {
        rect(3 * pSize, (4 + faceOffset) * pSize, 2 * pSize, pSize / 2);  
      }
    } 
    pop(); 
  }

  eat(nutrition) {
    if (this.isDead) return;
      
    this.isEating = true;
    this.eatTimer = millis() + 400; 
      
    let growthFloat = 8;
        
    this.size += nutrition * growthFloat;
    this.eatenCounter += nutrition;
        
    if (!this.isFat && this.size >= 256) {
      this.isFat = true;
      this.currentPattern = this.fatPattern;
    }
     
    if (this.size >= 400) {
      this.isDead = true;
      this.size = 400;
      this.currentPattern = this.deadPattern;
    }
  }

  reset() {
    this.x = width / 2;
    this.y = 300;
    this.size = 64;
    this.speed = 30;
    this.isEating = false;
    this.eatTimer = 0;
    this.eatenCounter = 0;
    this.isFat = false;
    this.isDead = false;
    this.currentPattern = this.monsterPattern;
  }
}