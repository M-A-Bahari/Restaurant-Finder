import { SKEvent, SKMouseEvent } from "../../simplekit/src/events";
import { SKElement, SKElementProps, Style } from "../../simplekit/src/widget";
import { SliderController } from "./slidercontroller";
import { SliderModel } from "./slidermodel";
import { SliderView } from "./sliderview";

export type SliderProps = SKElementProps & {
  value?: number;
  min?: number;
  max?: number;
  trackFillColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
};

export class Slider extends SKElement {
  // MVC components
  private _model: SliderModel;
  private _view: SliderView;
  private _controller: SliderController;

  // Color properties
  public trackFillColor: string;
  public thumbColor: string;
  public thumbHoverColor: string;
  public thumbActiveColor: string;

  constructor({
    value = 0,
    min = 0,
    max = 100,
    fill = Style.defaultColour,
    border = "black",
    width = 200,
    height = 30,
    margin = 5,
    trackFillColor = "#4CAF50",
    thumbColor = "#fff",
    thumbHoverColor = "#f0f0f0",
    thumbActiveColor = "#e0e0e0",
    ...elementProps
  }: SliderProps = {}) {
    super(elementProps);
    this.fill = fill;
    this.width = width;
    this.height = height;
    this.border = border;

    // Set color properties
    this.trackFillColor = trackFillColor;
    this.thumbColor = thumbColor;
    this.thumbHoverColor = thumbHoverColor;
    this.thumbActiveColor = thumbActiveColor;

    // Create MVC components
    this._model = new SliderModel(value, min, max);
    this._view = new SliderView(this, this._model);
    this._controller = new SliderController(this, this._model, this._view);

    // Initial layout calculations
    this.layout();
  }

  // Draw slider
  public draw(gc: CanvasRenderingContext2D): void {
    super.draw(gc);
    this._view.draw(gc);
  }

  // Get/set value
  public get value(): number {
    return this._model.value;
  }
  public set value(v: number) {
    this._model.value = v;
    this._view.update();
  }

  // Get/set min
  public get min(): number {
    return this._model.min;
  }
  public set min(m: number) {
    this._model.min = m;
    this._view.update();
  }

  // Get/set max
  public get max(): number {
    return this._model.max;
  }
  public set max(m: number) {
    this._model.max = m;
    this._view.update();
  }

  public sendEvent(e: SKEvent, capture?: boolean): boolean {
    return super.sendEvent(e, capture);
  }

  // Handle mouse events
  handleMouseEvent(me: SKMouseEvent): boolean {
    this._controller.handleMouseEvent(me);
    return true;
  }
}
