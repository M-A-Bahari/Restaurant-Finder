import { RadioButtonModel } from "./rbmodel";
import { RadioButton } from "./radiobutton";

export class RadioButtonView {
  // Reference to the RadioButton widget and its model
  private _radioButton: RadioButton;
  private _model: RadioButtonModel;
  private VIEW_WIDTH?: number;
  private VIEW_HEIGHT?: number;

  // Constructor for RadioButtonView
  constructor(radioButton: RadioButton, model: RadioButtonModel) {
    this._radioButton = radioButton;
    this._model = model;
    this.VIEW_WIDTH = this._radioButton.width;
    this.VIEW_HEIGHT = this._radioButton.height;
  }

  // Draws the radio button onto the provided graphics context
  public draw(gc: CanvasRenderingContext2D): void {
    gc.save();
    gc.translate(this._radioButton.margin, this._radioButton.margin);
    gc.translate(this._radioButton.x, this._radioButton.y);

    if (this.VIEW_WIDTH !== undefined && this.VIEW_HEIGHT !== undefined) {
      const radius = Math.min(this.VIEW_WIDTH, this.VIEW_HEIGHT) / 2;
      const centerX = this.VIEW_WIDTH / 2;
      const centerY = this.VIEW_HEIGHT / 2;

      // Draw outer circle
      gc.beginPath();
      gc.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      gc.fillStyle = this._radioButton.fill;
      gc.fill();

      // Draw border (highlight on hover)
      if (this._model.state === "hover") {
        gc.strokeStyle = this._radioButton.highlightColour;
      } else {
        gc.strokeStyle = this._radioButton.border;
      }
      gc.lineWidth = 2;
      gc.stroke();
      gc.closePath();

      // Draw inner filled circle if checked
      if (this._model.checked) {
        gc.save();
        gc.beginPath();
        gc.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
        gc.fillStyle = "black";
        gc.fill();
        gc.closePath();
        gc.restore();
      }
    }

    gc.restore();
  }

  // Update view whenever model is modified.
  public update(): void {
    // Currently nothing to do here.
    // draw() will always render current model state.
    return;
  }
}
