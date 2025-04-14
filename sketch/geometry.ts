class Vec2 {
  x:number
  y:number

  constructor(x:number = 0,y:number = 0) {
    this.x = x  
    this.y = y  
  }

  public add(b: Vec2) : Vec2 {
    this.x += b.x
    this.y += b.y
    return this
  }

  public sub(b: Vec2) : Vec2 {
    this.x -= b.x
    this.y -= b.y
    return this
  }

  public dot(b: Vec2) : number {
    return this.x * b.x + this.y * b.y
  }

  public normalize() : Vec2 {
    let l = this.len()
    this.x = this.x / l
    this.y = this.y / l
    return this
  }

  public scale(n: number) : Vec2 {
    this.x *= n
    this.y *= n
    return this
  }

  public len() : number {
    return sqrt(this.x * this.x + this.y * this.y)
  }

  public copy() : Vec2 {
    return new Vec2(this.x,this.y)
  }

  public dist(v: Vec2) : number {
    return this.copy().sub(v).len()
  }
}

function parametric_equation(theta: number) : Vec2 {
  return new Vec2(cos(theta),sin(theta))
}

const RAD360DEG = 6.28319

function normalize_angle(theta:number) : number {
  return theta - (theta > RAD360DEG ? RAD360DEG : (theta < 0 ? -RAD360DEG : 0))
} 

function lerp_target(at: number) {
  let x = lerp(this.last_target.x,this.target.x,at)
  let y = lerp(this.last_target.y,this.target.y,at)
  this.movement_target = new Vec2(x,y)
}