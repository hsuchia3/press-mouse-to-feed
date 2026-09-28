//let mic;
//let amp;
let pressedSize = 0;

let monster;
let foods = []; 
let pixelFont;

let threshold = 0.15;
let lastDropTime = 0;
let cooldown = 800;

let cloudTimer = 0;
let cloudOffset = 0;
let cloudSpeed = 5; 
let cloudInterval = 100;

function preload() {
  pixelFont = loadFont("PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(400, 400); 
  pixelDensity(1);

  //-----------set up the mic statement-----------
  // mic = new p5.AudioIn();
  // //mic.start();
  
  // amp = new p5.Amplitude();//the amplitude will show on the sounds bar
  // amp.setInput(mic); 
  //----------------------------------------------

  monster = new Monster();//show the monster
}

function draw() {
  background(200, 231, 240);
  
  //-----------set up clouds and flowers----------- 
/*in order to make clouds move a little delayed, we have to set up cloudOffset and cloudSpeed to control the movement of cloud, cloudpattern and flowerpatterm are in "flower.js" and "cloud.js"*/
  
  if (millis() > cloudTimer) {
    cloudOffset += cloudSpeed;
    if (cloudOffset >= 400) {//the size of the backgroud is 400*400
      cloudOffset = 0;//To let the movement of clouds moves continuously
    }
    cloudTimer = millis() + cloudInterval;
  }
  
  push(); 
  translate(-cloudOffset, 0);//let the movemont of the clould start from left

  drawCloudPattern(40, 60);
  drawCloudPattern(240, 100);
  drawCloudPattern(440, 60);//prepare two clouds outside of the canva
  drawCloudPattern(640, 100);
  
  pop(); 
  
  fill(125, 173, 125); // grass
  noStroke();
  rect(0, 350, 400, 50);
  
  drawFlowerPattern(50, 280);//flower pattern
  drawFlowerPattern(330, 280);
  drawFlowerPattern(150, 280);
  
  //----------------draw the text--------------------- 
  // let vol = mic.getLevel();
  //console.log(getAudioContext().state, vol);
  
  textFont(pixelFont);
  fill(0);
  textSize(12);
  textAlign(CENTER);
  //text("make noise to feed!", width / 2, 40);
  text("press mouse to feed!", width / 2, 40);
  
  if (mouseIsPressed) {
    pressedSize = min(pressedSize + 0.01, 0.5); 

  }
  fill(255);
  rect(100, 50, 200, 10); 
  fill(255, 94, 94);      
  rect(100, 50, pressedSize * 400, 10); 

  //---------------bar on the top-------------------- 
  // fill(255);
  // rect(100, 50, 200, 10);
  // fill(255, 94, 94);
  // let volWidth = min(vol * 1000, 200);//draw the volume bar(the red bar when it detect sound)
  // rect(100, 50, volWidth, 10);
  
  // fill('#FFF983');//draw the threshold line
  // let thresholdline = 100 + (threshold * 1000);
  // rect(thresholdline, 50, 2, 10);
  
  // //-------if statement for when the sound over the threshold and drop the food----------------
  
  // if (vol > threshold && millis() - lastDropTime > cooldown) {
  //   foods.push(new Food(vol));
  //   lastDropTime = millis();
  // }

  for (let i = foods.length - 1; i >= 0; i--) {
    foods[i].update();
    foods[i].show();//for loop to make sure the food are show up in order
    
    if (foods[i].hits(monster)) {
       let nutrition = round(foods[i].w / 40);
       monster.eat(nutrition);
       foods.splice(i, 1); //if statement for monster eat the food, food disapear(splice)
    }
  }

  monster.update();
  monster.show();
  
//---------------------DEAD STATEMENT----------------------
  if (monster.isDead) {//draw dead monster pattern
    fill(0, 180);
    rectMode(CORNER);
    rect(0, 0, width, height);

    fill(226, 92, 92);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("GAME OVER", width / 2, height / 2 - 20);
    
    fill(255);
    textSize(12);
    text("Press space to start", width / 2, height / 2 + 30);
  }
}

//-------------------------RESTART----------------------
function keyPressed() {
  if (key === ' ') {
    monster.reset();
    foods = []; 
  }
}

function mouseReleased() {
  if (pressedSize > 0) {
   
    foods.push(new Food(pressedSize)); 
    pressedSize = 0;
  }
}