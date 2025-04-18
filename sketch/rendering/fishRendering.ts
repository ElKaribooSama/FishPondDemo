class FishRenderer {
  public RenderFish(fish: Fish) {
    switch (fish.type) {
      case FishType.Base:
        this.normalFishPipeline(fish)
        break;
        case FishType.Base:
          
          break;
          case FishType.Base:
        
        break;
    }
  }

  normalFishPipeline(fish: Fish) {
    push()
    normalFishFrontFins(fish)
    normalFishBody(fish)
    normalFishBackFins(fish)
    normalFishEyes(fish)
    normalFishBackFins(fish)
    pop()
  }
}
