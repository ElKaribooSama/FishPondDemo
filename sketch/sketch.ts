// GLOBAL VARS & TYPES

let fishRenderer: FishRenderer
let boundary: Boundary
let allFish: Array<Fish> = []
let FISHAMOUNT = 50

let BOUNDARYKEEPAWAYDISTANCE = 100
let MOVEMENTSPEED = 2
let middlePosition = {
  x: 0,
  y: 0
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  fishRenderer = new FishRenderer()
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
  pixelDensity(1)

  
  middlePosition = {
    x: width / 2,
    y: height / 2
  }

  let fishSizes = [
    new Vec2(0.25,0.25),
    new Vec2(0.12,0.25),
    new Vec2(0.12,0.12),
    new Vec2(0.25,0.5 ),
  ]

  boundary = new Boundary()
  boundary.vertexes.push(new Vec2(330,280))
  boundary.vertexes.push(new Vec2(574,127))
  boundary.vertexes.push(new Vec2(876,222))
  boundary.vertexes.push(new Vec2(1150,201))
  boundary.vertexes.push(new Vec2(1354,422))
  boundary.vertexes.push(new Vec2(1176,621))
  boundary.vertexes.push(new Vec2(863,606))
  boundary.vertexes.push(new Vec2(534,688))
  boundary.vertexes.push(new Vec2(334,484))
  boundary.calculateMiddle()

  for(let i=0;i<FISHAMOUNT;i++) {
    allFish.push(new Fish())
    allFish[i].change_size(random(fishSizes))
    allFish[i].chain.point_position[0] = new Vec2(middlePosition.x,middlePosition.y)
    allFish[i].behavior.change_target(new Vec2(middlePosition.x,middlePosition.y))
    allFish[i].home = new Vec2(middlePosition.x,middlePosition.y)
    allFish[i].behavior.boundary = boundary
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
  background(125);
  updateAllfish()
  drawAllfish()
  background(95, 214, 232,125)
  boundary.render()

  if (mouseIsPressed) {
    allFish[0].move_toward(new Vec2(mouseX,mouseY))
    console.log(boundary.isInside(new Vec2(mouseX,mouseY)))
  }
  
  let fps = frameRate();
  text(fps, 50, 50);
  text(`x= ${mouseX}, y= ${mouseY}`,50,60)
}