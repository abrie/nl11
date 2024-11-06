export class Utils {
  static generateSolidColor(scene: Phaser.Scene, key: string, width: number, height: number, color: number): void {
    const graphics = scene.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }
}
