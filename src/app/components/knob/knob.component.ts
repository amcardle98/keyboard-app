import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
})
export class KnobComponent {
  public value: number = 0;
  private maxY!: number;
  private readonly minValue = 0;
  private readonly maxValue = 100;

  @Input() function!: string;

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event: MouseEvent): void {
    this.maxY = event.clientY;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(event: MouseEvent): void {
    const deltaY = this.maxY - event.clientY; // Invert the delta calculation
    this.maxY = event.clientY;

    this.value += deltaY; // Now moving the mouse up increases the value

    // Prevent the value from going negative
    if (this.value < 0) {
      this.value = 0;
    }

    // Prevent the value from going over 100
    if (this.value > 100) {
      this.value = 100;
    }
  }

  onMouseUp(event: MouseEvent): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  calculateNotchAngle(): number {
    const angleMin = -135; // for 0 value, pointing down-left
    const angleMax = 135; // for max value, pointing down-right
    const angleRange = angleMax - angleMin;

    // Map the value to an angle
    const angle =
      angleMin + (this.value / (this.maxValue - this.minValue)) * angleRange;
    return angle;
  }

  getNotchTransform(): string {
    const angle = this.calculateNotchAngle();
    return `translateX(-50%) rotate(${angle}deg)`;
  }
}
