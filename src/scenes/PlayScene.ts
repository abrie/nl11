import Phaser from 'phaser';
import { MapManager } from '../mapManager';
import { Player } from '../player';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';

export class PlayScene extends Phaser.Scene {
  private mapManager: MapManager;
  private player: Player;

  constructor() {
    super({ key: 'PlayScene' });
  }

  preload(): void {
    // Preload assets if needed
  }

  create(): void {
    this.mapManager = new MapManager(this);
    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  }

  update(): void {
    this.player.update();
  }
}
