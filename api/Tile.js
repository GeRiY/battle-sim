const Tiletypes = {
  GROUND: 0,
  GRASS: 0,
  WALL: 1,
}
export default class Tile {
  constructor(type, x, y) {
    this.key = Tiletypes[type];
    this.type = type;
    this.name = type;
    this.x = x;
    this.y = y;
  }

  isWalkable() {
    return this.key === 0;
  }
}
