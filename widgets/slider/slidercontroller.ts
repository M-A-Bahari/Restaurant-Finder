import { SKEvent, SKMouseEvent } from "../../simplekit/src/imperative-mode";
import { SliderModel } from "./slidermodel";
import { Slider } from "./slider";
import { SliderView } from "./sliderview";

export class SliderController {
  private _slider: Slider;
  private _model: SliderModel;
  private _view: SliderView;

  constructor(slider: Slider, model: SliderModel, view: SliderView) {
    this._slider = slider;
    this._model = model;
    this._view = view;
  }

  handleMouseEvent(me: SKMouseEvent): boolean {
    switch (me.type) {
      case "mousedown":
        // Start dragging
        this._model.state = "dragging";
        this.updateValueFromMouseX(me.x);

        // Send action event
        this._slider.sendEvent({
          source: this._slider,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        return true;

      case "mousemove":
        if (this._model.state === "dragging") {
          // Continue dragging
          this.updateValueFromMouseX(me.x);

          // Send action event for continuous updates
          this._slider.sendEvent({
            source: this._slider,
            timeStamp: me.timeStamp,
            type: "action",
          } as SKEvent);
          return true;
        }
        break;

      case "mouseup":
        if (this._model.state === "dragging") {
          this._model.state = "hover";

          // Send final action event
          this._slider.sendEvent({
            source: this._slider,
            timeStamp: me.timeStamp,
            type: "action",
          } as SKEvent);
          return true;
        }
        break;

      case "mouseenter":
        if (this._model.state !== "dragging") {
          this._model.state = "hover";
        }
        break;

      case "mouseexit":
        if (this._model.state !== "dragging") {
          this._model.state = "idle";
        }
        break;
    }

    return false;
  }

  // Update the slider value based on mouse X position
  private updateValueFromMouseX(mouseX: number): void {
    // Get the track width
    const trackWidth = this._view.getTrackWidth();

    // Convert mouse X to normalized position (0 to 1)
    // Account for margins and slider position
    const localX = mouseX - this._slider.margin;
    const normalizedPos = Math.max(0, Math.min(1, localX / trackWidth));

    // Update model value
    this._model.setFromNormalizedPosition(normalizedPos);
  }
}
