export class InputManager {
  private input: { leftShift: boolean; leftArrow: boolean; rightArrow: boolean; upArrow: boolean; downArrow: boolean };

  constructor() {
    this.input = {
      leftShift: false,
      leftArrow: false,
      rightArrow: false,
      upArrow: false,
      downArrow: false,
    };

    this.initializeInputListeners();
  }

  private initializeInputListeners(): void {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ShiftLeft':
        this.input.leftShift = true;
        break;
      case 'ArrowLeft':
        this.input.leftArrow = true;
        break;
      case 'ArrowRight':
        this.input.rightArrow = true;
        break;
      case 'ArrowUp':
        this.input.upArrow = true;
        break;
      case 'ArrowDown':
        this.input.downArrow = true;
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ShiftLeft':
        this.input.leftShift = false;
        break;
      case 'ArrowLeft':
        this.input.leftArrow = false;
        break;
      case 'ArrowRight':
        this.input.rightArrow = false;
        break;
      case 'ArrowUp':
        this.input.upArrow = false;
        break;
      case 'ArrowDown':
        this.input.downArrow = false;
        break;
    }
  }

  public getInputState(): { leftShift: boolean; leftArrow: boolean; rightArrow: boolean; upArrow: boolean; downArrow: boolean } {
    return this.input;
  }
}
