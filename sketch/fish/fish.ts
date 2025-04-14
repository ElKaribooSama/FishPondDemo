class Fish {
  chain: Chain
  color: Color
  body_segment_sizes: Array<number>
  home: Vec2
  size: number
  length: number

  movement_target: Vec2

  type: FishType

  behavior: FishBehavior

  constructor() {
    this.change_size(1)
    this.behavior.target = new Vec2(0,0)
    this.behavior.last_target = new Vec2(0,0)
    this.movement_target = new Vec2(0,0)
    this.type = FishType.Base
    this.behavior = new FishBehavior()

    this.color = new Color(58, 124, 165)
  }

  public change_size(size:number,length: number = 1) {
    this.size = size
    this.chain = new Chain()
    this.chain.npoint = 12
    this.chain.global_constraint_angle = radians(180/8)
    
    this.chain.global_constraint_distance = 24*length
    this.body_segment_sizes = [68*size, 81*size, 84*size, 78*size, 74*size, 64*size, 54*size, 44*size, 34*size, 24*size,12*size,0*size]
    
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