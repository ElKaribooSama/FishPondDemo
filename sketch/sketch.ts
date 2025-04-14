// GLOBAL VARS & TYPES
let fishRenderer: FishRenderer = new FishRenderer()

let allFish: Array<Fish> = []
let FISHAMOUNT = 50

let MOVEMENTSPEED = 2
let middlePosition = {
  x: 0,
  y: 0
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
  pixelDensity(1)

  
  middlePosition = {
    x: width / 2,
    y: height / 2
  }

  for(let i=0;i<FISHAMOUNT;i++) {
    allFish.push(new Fish())
    allFish[i].change_size(0.25,0.25)
    allFish[i].chain.point_position[0] = new Vec2(middlePosition.x,middlePosition.y)
    allFish[i].target = new Vec2(middlePosition.x,middlePosition.y)
    allFish[i].home = new Vec2(middlePosition.x,middlePosition.y)
    allFish[i].change_target(new Vec2(middlePosition.x,middlePosition.y))
  }

  background(0);
  stroke(255)
}


// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  middlePosition = {
    x: width / 2,
    y: height / 2
  }
}

function updateAllfish() {
  for(let i=0;i<allFish.length;i++) {
    allFish[i].update()
  }
}

function drawAllfish() {
  for(let i=0;i<allFish.length;i++) {
    allFish[i].render()
  }
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // CLEAR BACKGROUND
  background(0);
  updateAllfish()
  drawAllfish()

  if (mouseIsPressed) {
    allFish[0].move_toward(new Vec2(mouseX,mouseY))
  }
  
  let fps = frameRate();
  text(fps, 50, 50);
}