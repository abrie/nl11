import { TILE_SIZE, GAME_WIDTH, GAME_HEIGHT } from './config';

export class MapGenerator {
  private width: number;
  private height: number;
  private map: number[][];

  constructor() {
    this.width = Math.floor(GAME_WIDTH / TILE_SIZE);
    this.height = Math.floor(GAME_HEIGHT / TILE_SIZE);
    this.map = this.initializeMap();
    this.generateCavern();
  }

  private initializeMap(): number[][] {
    const map = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(Math.random() < 0.45 ? 1 : 0);
      }
      map.push(row);
    }
    return map;
  }

  private generateCavern(): void {
    for (let i = 0; i < 5; i++) {
      this.map = this.applyCellularAutomataRules(this.map);
    }
  }

  private applyCellularAutomataRules(map: number[][]): number[][] {
    const newMap = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countFilledNeighbors(map, x, y);
        if (map[y][x] === 1) {
          row.push(neighbors >= 4 ? 1 : 0);
        } else {
          row.push(neighbors >= 5 ? 1 : 0);
        }
      }
      newMap.push(row);
    }
    return newMap;
  }

  private countFilledNeighbors(map: number[][], x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          count += map[ny][nx];
        } else {
          count++;
        }
      }
    }
    return count;
  }

  public getMap(): number[][] {
    return this.map;
  }
}
