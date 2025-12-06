import { SliderModel } from "./slidermodel";
import { Slider } from "./slider";

export class SliderView {
  // Reference to the Slider widget and its model
  private _slider: Slider;
  private _model: SliderModel;

  // Visual constants
  private TRACK_HEIGHT = 6;
  private THUMB_RADIUS = 10;

  // Constructor for SliderView
  constructor(slider: Slider, model: SliderModel) {
    this._slider = slider;
    this._model = model;
  }

  // Draws the slider onto the provided graphics context
  public draw(gc: CanvasRenderingContext2D): void {
    gc.save();
    gc.translate(this._slider.margin, this._slider.margin);
    gc.translate(this._slider.x, this._slider.y);

    const trackWidth = this._slider.width || 200;
    const trackY = (this._slider.height || 30) / 2;

    // Calculate thumb position based on current value
    const thumbX = trackWidth * this._model.normalizedPosition;

    // Draw track background
    gc.beginPath();
    gc.fillStyle = "#ddd";
    gc.fillRect(0, trackY - this.TRACK_HEIGHT / 2, trackWidth, this.TRACK_HEIGHT);
    gc.closePath();

    // Draw filled portion of track (from start to thumb)
    gc.beginPath();
    gc.fillStyle = this._slider.trackFillColor;
    gc.fillRect(0, trackY - this.TRACK_HEIGHT / 2, thumbX, this.TRACK_HEIGHT);
    gc.closePath();

    // Draw track border
    gc.beginPath();
    gc.strokeStyle = this._slider.border;
    gc.lineWidth = 1;
    gc.strokeRect(0, trackY - this.TRACK_HEIGHT / 2, trackWidth, this.TRACK_HEIGHT);
    gc.closePath();

    // Draw thumb
    gc.beginPath();
    gc.arc(thumbX, trackY, this.THUMB_RADIUS, 0, 2 * Math.PI);

    // Change thumb color based on state
    if (this._model.state === "dragging") {
      gc.fillStyle = this._slider.thumbActiveColor;
    } else if (this._model.state === "hover") {
      gc.fillStyle = this._slider.thumbHoverColor;
    } else {
      gc.fillStyle = this._slider.thumbColor;
    }
    gc.fill();

    // Thumb border
    gc.strokeStyle = this._slider.border;
    gc.lineWidth = 2;
    gc.stroke();
    gc.closePath();

    gc.restore();
  }

  // Calculate thumb X position for hit testing
  public getThumbX(): number {
    const trackWidth = this._slider.width || 200;
    return trackWidth * this._model.normalizedPosition;
  }

  // Calculate track width for position calculations
  public getTrackWidth(): number {
    return this._slider.width || 200;
  }

  // Update view whenever model is modified.
  public update(): void {
    // Currently nothing to do here.
    // draw() will always render current model state.
    return;
  }
}
