/*
   Model for Slider widget
*/
export class SliderModel {
  private _state: "idle" | "dragging" | "hover" = "idle";
  private _value: number;
  private _min: number;
  private _max: number;

  constructor(value: number, min: number, max: number) {
    this._min = min;
    this._max = max;
    this._value = this.clamp(value, min, max);
  }

  // Clamp value between min and max
  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  public get value(): number {
    return this._value;
  }

  public set value(v: number) {
    this._value = this.clamp(v, this._min, this._max);
  }

  public get min(): number {
    return this._min;
  }

  public set min(m: number) {
    this._min = m;
    this._value = this.clamp(this._value, this._min, this._max);
  }

  public get max(): number {
    return this._max;
  }

  public set max(m: number) {
    this._max = m;
    this._value = this.clamp(this._value, this._min, this._max);
  }

  public get state() {
    return this._state;
  }

  public set state(s: "idle" | "dragging" | "hover") {
    this._state = s;
  }

  // Get normalized position (0 to 1) for the current value
  public get normalizedPosition(): number {
    if (this._max === this._min) return 0;
    return (this._value - this._min) / (this._max - this._min);
  }

  // Set value from normalized position (0 to 1)
  public setFromNormalizedPosition(pos: number): void {
    const clampedPos = this.clamp(pos, 0, 1);
    this._value = this._min + clampedPos * (this._max - this._min);
  }
}
