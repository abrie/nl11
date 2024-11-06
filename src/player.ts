import { Utils } from './utils';
import { TILE_SIZE } from './config';
import { InputManager } from './inputManager';

enum PlayerState {
  IDLE,
  RUNNING,
  FALLING,
  GRAPPLING,
  GLIDING
}

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.GameObjects.Sprite;
  private inputManager: InputManager;
  private state: PlayerState;
  private grapplingHook: Phaser.GameObjects.Line | null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.inputManager = new InputManager();
    this.state = PlayerState.IDLE;
    this.grapplingHook = null;

    Utils.generateSolidColor(this.scene, 'player', TILE_SIZE, TILE_SIZE, 0xff0000);
    this.sprite = this.scene.add.sprite(x, y, 'player');
    this.scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
  }

  public update(): void {
    const input = this.inputManager.getInputState();

    switch (this.state) {
      case PlayerState.IDLE:
        if (input.leftArrow || input.rightArrow) {
          this.state = PlayerState.RUNNING;
        } else if (!this.sprite.body.blocked.down) {
          this.state = PlayerState.FALLING;
        }
        break;

      case PlayerState.RUNNING:
        if (input.leftArrow) {
          this.sprite.body.setVelocityX(-160);
        } else if (input.rightArrow) {
          this.sprite.body.setVelocityX(160);
        } else {
          this.sprite.body.setVelocityX(0);
          this.state = PlayerState.IDLE;
        }

        if (!this.sprite.body.blocked.down) {
          this.state = PlayerState.FALLING;
        }
        break;

      case PlayerState.FALLING:
        if (input.leftArrow) {
          this.sprite.body.setVelocityX(-160);
          this.state = PlayerState.GLIDING;
        } else if (input.rightArrow) {
          this.sprite.body.setVelocityX(160);
          this.state = PlayerState.GLIDING;
        }

        if (this.sprite.body.blocked.down) {
          this.state = PlayerState.IDLE;
        }
        break;

      case PlayerState.GLIDING:
        if (input.leftArrow) {
          this.sprite.body.setVelocityX(-160);
        } else if (input.rightArrow) {
          this.sprite.body.setVelocityX(160);
        }

        if (this.sprite.body.blocked.down) {
          this.state = PlayerState.IDLE;
        }
        break;

      case PlayerState.GRAPPLING:
        if (input.upArrow) {
          this.sprite.body.setVelocityY(-160);
        } else if (input.downArrow) {
          this.sprite.body.setVelocityY(160);
        } else {
          this.sprite.body.setVelocityY(0);
        }

        if (!input.leftShift) {
          this.grapplingHook?.destroy();
          this.grapplingHook = null;
          this.state = PlayerState.FALLING;
        }
        break;
    }

    if (input.leftShift && this.state !== PlayerState.GRAPPLING) {
      this.deployGrapplingHook();
    }
  }

  private deployGrapplingHook(): void {
    const x = this.sprite.x;
    const y = this.sprite.y;

    for (let i = y; i >= 0; i -= TILE_SIZE) {
      const tile = this.scene.physics.world.collide(this.sprite, this.scene.add.rectangle(x, i, TILE_SIZE, TILE_SIZE, 0x000000, 0));
      if (tile) {
        this.grapplingHook = this.scene.add.line(0, 0, x, y, x, i, 0xffffff);
        this.scene.physics.add.existing(this.grapplingHook);
        this.sprite.body.setVelocityX(0);
        this.state = PlayerState.GRAPPLING;
        break;
      }
    }
  }
}
