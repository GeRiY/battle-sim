import PF from 'pathfinding';
import Tile from "~/api/Tile";

export default class GameMap {
  constructor(width, height, aroundWalls = false) {
    this.width = width;
    this.height = height;
    this.mapByTiles = [];
    this.mapByKeys = [];
    this.generateMap();
    if (aroundWalls) {
      this.setSidesToWall();
    }
    this.generateMapByKeys();
  }

  generateMap() {
    for (let i = 0; i < this.height; i++) {
      this.mapByTiles.push([]);
      for (let j = 0; j < this.width; j++) {
        this.mapByTiles[i].push(new Tile('GRASS', j, i));
      }
    }
  }

  setSidesToWall() {
    for (let i = 0; i < this.height; i++) {
      this.mapByTiles[i][0] = new Tile('WALL', 0, i);
      this.mapByTiles[i][this.width - 1] = new Tile('WALL', this.width - 1, i);
    }
    for (let i = 0; i < this.width; i++) {
      this.mapByTiles[0][i] = new Tile('WALL', i, 0);
      this.mapByTiles[this.height - 1][i] = new Tile('WALL', i, this.height - 1);
    }
  }

  generateMapByKeys() {
    this.mapByKeys = this.mapByTiles.map(row =>
      row.map(tile => tile.key));
  }

  getWalkableCooridantes() {
    const walkableCooridantes = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.mapByKeys[i][j] === 0) {
          walkableCooridantes.push([j, i]);
        }
      }
    }
    return walkableCooridantes;
  }

  checkWalkable(x, y) {
    if (!this.isRealCoordinates(x, y)) {
      return false;
    }
    console.log('checkWalkable',this.mapByKeys[y][x])
    return this.mapByKeys[y][x] === 0;
  }

  isRealCoordinates(x, y) {
    return !!(this.mapByKeys[y] && this.mapByKeys[y][x]);

  }

  getDistance(x1, y1, x2, y2,aliveSolders) {
    return this.getPath(x1, y1, x2, y2,aliveSolders).length;
  }

  getPath(x1, y1, x2, y2,aliveSolders) {
    const map = JSON.parse(JSON.stringify(this.mapByKeys));
    if (aliveSolders) {
      aliveSolders.forEach(solder => {
        map[solder.y][solder.x] = 1;
      });
    }
    const grid = new PF.Grid(map);
    const finder = new PF.DijkstraFinder({
      allowDiagonal: true,
      dontCrossCorners: true
    });
    const path = finder.findPath(x1, y1, x2, y2, grid);
    if (path.length > 0) {
      return path;
    }
    return []
  }
}
