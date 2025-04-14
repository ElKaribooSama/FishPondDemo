
class FishBehavior {

  start_lerp_time: number
  target: Vec2
  last_target: Vec2

  update(fish: Fish) {
    let timeElapsed = (Date.now() - this.start_lerp_time) / 1000 // in seconds
    let lerpTime = 1
    
    lerp_target(timeElapsed/lerpTime)
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
    let homeBehaviorChangeDistance = 200
    let homeMaxDistance = 600

    
    let headPoint = fish.chain.point_position[0]
    let homeDistance = headPoint.dist(fish.home)

    if (homeDistance < homeMaxDistance && homeDistance < homeBehaviorChangeDistance) {
      let chosenAngle = random(-50,50)
      this.change_target(this.target_from_angle(targetDistance,chosenAngle,fish))
      console.log("changing angle by :", chosenAngle)
    }

    if (homeDistance > homeMaxDistance) {
      console.log("returning home")
      this.change_target(fish.home)
    }

    if (homeDistance > homeBehaviorChangeDistance) {
      let angles = [random(-50,-15),random(-15,15),random(15,50)]
      let smallest = this.target_from_angle(targetDistance,angles[0],fish)
      
      for(let i=1;i<angles.length;i++) {
          let newpos = this.target_from_angle(targetDistance,angles[i],fish)
          if (newpos.dist(fish.home) < smallest.dist(fish.home)) smallest = newpos
      }
      this.change_target(smallest)
    }
  }
}