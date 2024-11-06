import { Utils } from './utils';
import { MapGenerator } from './mapGenerator';
import { TILE_SIZE } from './config';

export class MapManager {
  private scene: Phaser.Scene;
  private mapGenerator: MapGenerator;
  private tilemap: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.DynamicTilemapLayer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.mapGenerator = new MapGenerator();
    this.createTilesetImages();
    this.buildTilemap();
  }

  private createTilesetImages(): void {
    Utils.generateSolidColor(this.scene, 'empty', TILE_SIZE, TILE_SIZE, 0x00ff00);
    Utils.generateSolidColor(this.scene, 'filled', TILE_SIZE, TILE_SIZE, 0x000000);
  }

  private buildTilemap(): void {
    const mapData = this.mapGenerator.getMap();
    this.tilemap = this.scene.make.tilemap({
      data: mapData,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE
    });
    this.tileset = this.tilemap.addTilesetImage('tileset', null, TILE_SIZE, TILE_SIZE);
    this.layer = this.tilemap.createDynamicLayer(0, this.tileset, 0, 0);
    this.layer.setCollisionByExclusion([-1], true);
  }
}
