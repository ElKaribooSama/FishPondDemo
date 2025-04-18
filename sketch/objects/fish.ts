class Fish {
  chain: Chain
  color: Color
  home: Vec2
  size: number
  length: number

  movement_target: Vec2

  type: FishType

  behavior: FishBehavior

  constructor() {
    this.change_size(new Vec2(0.25,0.3))
    this.home = new Vec2(0,0)
    this.behavior = new FishBehavior()

    this.movement_target = new Vec2(0,0)
    this.type = FishType.Base

    this.color = new Color(58, 124, 165)
  }

  public change_size(size: Vec2) {
    this.size = size.x
    this.chain = new Chain()
    this.chain.npoint = 12
    this.chain.global_constraint_angle = radians(180/8)
    
    this.chain.global_constraint_distance = 24*size.y
    
    this.chain.constraint_angle[0] = radians(10)
    this.chain.setup()
  }

  public update() {
    this.behavior.update(this)
  }

  public move_toward(direction: Vec2) {
    this.behavior.change_target(direction)
  }

  public render() {
    fishRenderer.RenderFish(this)
  }
}