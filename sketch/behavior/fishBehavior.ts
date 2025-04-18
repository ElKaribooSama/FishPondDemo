
class FishBehavior {

  start_lerp_time: number
  target: Vec2
  last_target: Vec2
  boundary: Boundary

  constructor() {
    this.target = new Vec2(0,0)
    this.last_target = new Vec2(0,0)
  }

  update(fish: Fish) {
    let timeElapsed = (Date.now() - this.start_lerp_time) / 1000 // in seconds
    let lerpTime = 1
    
    fish.movement_target = lerp_target(this.last_target,this.target,timeElapsed/lerpTime)
    if(timeElapsed/lerpTime > 1) {
      this.new_direction(fish)
    }
    this.move(fish)
    
    //update chain
    fish.chain.update()
  }

  private move(fish: Fish) {
    //move toward target
    let direction = fish.movement_target.copy().sub(fish.chain.point_position[0])
    if(abs(direction.x) + abs(direction.y) > MOVEMENTSPEED*0.1) {
      fish.chain.point_position[0].add(direction.normalize().scale(MOVEMENTSPEED))
    }
  }

  private target_from_angle(targetDistance: number,theta: number, fish: Fish) : Vec2 {
    const targetDistanceMod = 20
    let direction = parametric_equation(radians(theta + 180) + fish.chain.angles[0]).scale(targetDistance * targetDistanceMod)
    return new Vec2(
      fish.chain.point_position[0].x + direction.x,
      fish.chain.point_position[0].y + direction.y)
  }

  public change_target(newTarget: Vec2) {
    this.last_target = this.target
    this.target = newTarget
    this.start_lerp_time = Date.now()
  }

  private new_direction(fish: Fish) { 
    let targetDistance = 50
    let headPoint = fish.chain.point_position[0]

    if (this.boundary.isInside(headPoint)) {
      let chosenAngle = random(-50,50)
      this.change_target(this.target_from_angle(targetDistance,chosenAngle,fish))
    } else {
      let angles = [random(-50,-15),random(-15,15),random(15,50)]
      let smallest = this.target_from_angle(targetDistance,angles[0],fish)
      
      for(let i=1;i<angles.length;i++) {
          let newpos = this.target_from_angle(targetDistance,angles[i],fish)
          if (newpos.dist(this.boundary.center) < smallest.dist(this.boundary.center)) smallest = newpos
      }
      this.change_target(this.boundary.cen)
    }
  }
}