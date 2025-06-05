class Boundary {
  vertexes: Array<Vec2> = []
  center: Vec2 = new Vec2()

  public render() {
    push()

    stroke(255)
    beginShape()

    for (let i = 0 ;i < this.vertexes.length ;i++ ) {
      vertex(this.vertexes[i].x,this.vertexes[i].y)
    }

    circle(this.center.x,this.center.y,10)

    endShape(CLOSE)
    pop()
  }

  public distToBoundary(p: Vec2) {
    let s_distance = Number.MAX_VALUE
    let s_point = new Vec2()

    for (let i = 1; i < this.vertexes.length; i++) {
      let a = this.vertexes[i-1].copy()
      let b = this.vertexes[i].copy()

      let ab = b.copy().sub(a);
      let ap = p.copy().sub(a)

      let proj = ap.dot(ab)
      let ablensquared = ab.len() * ab.len()
      let d = proj / ablensquared

      let scaling = min(max(0,d),1)  

      let closestPoint = a.add(ab.scale(scaling))
      let distToP = p.dist(closestPoint)
      
      if (s_distance > distToP) {
        s_distance = distToP
        s_point = closestPoint
      }
    }

    return s_point
  }

  public calculateMiddle() {
    this.center.x = 0
    this.center.y = 0

    for (let i = 0 ;i < this.vertexes.length ;i++ ) {
      this.center.add(this.vertexes[i])
    }
    
    this.center.scale(1/this.vertexes.length)
  }

  public isOutside(p: Vec2) {
    return !this.isInside(p)
  }

  public isInside(p: Vec2) {
    let minX = this.vertexes[0].x
    let maxX = this.vertexes[0].x
    let minY = this.vertexes[0].y
    let maxY = this.vertexes[0].y
    for (let i = 1 ; i < this.vertexes.length ; i++ ) {
        let q = this.vertexes[i]
        minX = min( q.x, minX )
        maxX = max( q.x, maxX )
        minY = min( q.y, minY )
        maxY = max( q.y, maxY )
    }

    if ( p.x < minX || p.x > maxX || p.y < minY || p.y > maxY ) {
        return false
    }

    let inside = false
    for (let i = 0, j = this.vertexes.length - 1 ; i < this.vertexes.length ; j = i++ ) {
        if ((this.vertexes[i].y > p.y) != (this.vertexes[j].y > p.y) &&
             p.x < (this.vertexes[j].x - this.vertexes[i].x) * (p.y - this.vertexes[i].y) / (this.vertexes[j].y - this.vertexes[i].y) + this.vertexes[i].x){
            inside = !inside
        }
    }

    return inside
  }
}