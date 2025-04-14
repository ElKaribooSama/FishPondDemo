
function normalFishBody(fish: Fish) {
  stroke(255)
    strokeWeight(2)
    fill(fish.color.r,fish.color.g,fish.color.b,fish.color.a)

    beginShape()
    //draw head contour
    let headposition = fish.chain.point_position[0]
    let pos = null
    let headangles = [90,160,200,270]
    let point = null

    for (let i = fish.chain.npoint-1; i >= 1; i--) {
      point = fish.chain.point_position[i]
      pos = parametric_equation(radians(90) + fish.chain.angles[i-1]).scale(fish.body_segment_sizes[i]/2).add(point)
      curveVertex(pos.x,pos.y)
    }

    for (let i = 0; i < headangles.length; i++) {
      pos = parametric_equation(radians(headangles[i]) + fish.chain.angles[0]).scale(fish.body_segment_sizes[0]/2).add(headposition)
      curveVertex(pos.x,pos.y)    
    }

    for (let i = 1; i < fish.chain.npoint; i++) {
      point = fish.chain.point_position[i]
      pos = parametric_equation(radians(270) + fish.chain.angles[i-1]).scale(fish.body_segment_sizes[i]/2).add(point)
      curveVertex(pos.x,pos.y)
    }

    endShape()
}

function normalFishFrontFins(fish: Fish) {
  let finsize = 50*fish.size

  let frontfin = 3
  let frontfinpoint = fish.chain.point_position[frontfin]
  let frontfindistance = 40*fish.size

  
  let point = parametric_equation(radians(90) + fish.chain.angles[frontfin]).scale(frontfindistance).add(frontfinpoint)
  
  push()
  
  fill(129, 195, 215)
  color(255)
  
  translate(point.x,point.y)
  rotate(radians(45) + fish.chain.angles[frontfin-1])
  ellipse(0,0,finsize,finsize/2)

  pop()

  push()
  fill(129, 195, 215)
  point = parametric_equation(radians(270) + fish.chain.angles[frontfin]).scale(frontfindistance).add(frontfinpoint)
  
  translate(point.x,point.y)
  rotate(radians(-45) + fish.chain.angles[frontfin-1])
  ellipse(0,0,finsize,finsize/2)
  pop()
}

function normalFishBackFins(fish: Fish) {
  let fin = 10
  let finpoint = fish.chain.point_position[fin]
  
  let point = parametric_equation(radians(90) + fish.chain.angles[fin]).add(finpoint)
  
  push()
  
  fill(129, 195, 215)
  color(255)
  
  let distang = abs(fish.chain.angles[fin-4] - fish.chain.angles[fin])
  let distanceangle = min(distang,radians(360)-distang)
  let direction = fish.chain.point_position[fin].copy().sub(fish.chain.point_position[fin-1])
  let rightvector = new Vec2(-direction.y,direction.x).normalize().scale(6*fish.size+distanceangle*10*fish.size)
  let startingpoint = new Vec2(point.x-direction.x/2,point.y-direction.y/2)


  beginShape()
  
  curveVertex(startingpoint.x-direction.x*0.1,startingpoint.y-direction.y*0.1)
  curveVertex(startingpoint.x,startingpoint.y)
  
  curveVertex(startingpoint.x + direction.x/2 - rightvector.x,startingpoint.y + direction.y/2 - rightvector.y)
  curveVertex(startingpoint.x + direction.x - rightvector.x,startingpoint.y + direction.y - rightvector.y)
  curveVertex(startingpoint.x + direction.x*1.5 - rightvector.x/2,startingpoint.y + direction.y*1.5 - rightvector.y/2)
  
  curveVertex(startingpoint.x + direction.x*1.1,startingpoint.y + direction.y*1.1)
  
  curveVertex(startingpoint.x + direction.x*1.5 + rightvector.x/2,startingpoint.y + direction.y*1.5 + rightvector.y/2)
  curveVertex(startingpoint.x + direction.x + rightvector.x,startingpoint.y + direction.y + rightvector.y)
  curveVertex(startingpoint.x + direction.x/2 + rightvector.x,startingpoint.y + direction.y/2 + rightvector.y)
  
  curveVertex(startingpoint.x,startingpoint.y)
  curveVertex(startingpoint.x-direction.x*0.1,startingpoint.y-direction.y*0.1)
  
  
  endShape(CLOSE)

  pop()
}

function normalFishEyes(fish: Fish) {
  push()

  fill(255)
  
  let eyedistance = 20*fish.size
  let eyeangles = radians(100)
  let eyesize = 10*fish.size
  let pos = parametric_equation(radians(180) + eyeangles + fish.chain.angles[0]).scale(eyedistance).add(fish.chain.point_position[0])
  circle(pos.x,pos.y,eyesize)

  pos = parametric_equation(radians(180) - eyeangles + fish.chain.angles[0]).scale(eyedistance).add(fish.chain.point_position[0])
  circle(pos.x,pos.y,eyesize)

  pop()
}