
class Chain {
  point_position: Array<Vec2>
  angles: Array<number>
  
  //parameters
  npoint: number
  global_constraint_angle: number
  global_constraint_distance: number

  constraint_angle: Array<number>
  constraint_distance: Array<number>
  
  debug_render_size: number
  
  constructor() {
    this.npoint = 0
    this.point_position = []
    this.angles = []
    this.constraint_distance = []
    this.constraint_angle = []
    this.debug_render_size = 10
    this.global_constraint_angle = RAD360DEG
    this.global_constraint_distance = 100

    this.setup()
  }

  setup() {
    for (let i = 0; i < this.npoint; i++) {
      this.point_position.push(new Vec2())
      this.constraint_angle.push(this.global_constraint_angle)
      this.constraint_distance.push(this.global_constraint_distance)
    }

    for (let i = 0; i < this.npoint-1; i++) {
      this.angles[0]
    }
  }

  public update() {
    for (let i = 0; i < this.npoint-1; i++) {
      let a = this.point_position[i]
      let b = this.point_position[i+1]
      let direction: Vec2 = b.sub(a);
      let currentangle = atan2(direction.y,direction.x)

      if (i != 0) {
        let d = currentangle - this.angles[i-1]

        if (d < 0) d += radians(360)
        if (d > radians(360)) d -= radians(360)

        let distance = min(abs(d),radians(360) - abs(d))

        if (distance > this.constraint_angle[i-1]) {
          if (d < radians(180)) {
            currentangle += this.constraint_angle[i-1] - distance
          } else {
            currentangle -= this.constraint_angle[i-1] - distance
          }
        }
      }

      this.point_position[i+1] = new Vec2().add(a).add(parametric_equation(currentangle).scale(this.constraint_distance[i]))
      
      this.angles[i] = currentangle
    }
  }

  public render() {
    push()
    
    strokeWeight(this.debug_render_size)

    beginShape()

    for (let i = 0; i < this.npoint; i++) {
      let point: Vec2 = this.point_position[i]
      vertex(point.x,point.y)
      circle(point.x,point.y,this.debug_render_size)
    }

    endShape()

    pop()
  }
}