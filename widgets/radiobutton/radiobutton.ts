import { SKEvent, SKMouseEvent } from "../../simplekit/src/events";
import { SKElement, SKElementProps, Style } from "../../simplekit/src/widget";
import { RadioButtonController } from "./rbcontroller";
import { RadioButtonModel } from "./rbmodel";
import { RadioButtonView } from "./rbview";
import { RadioButtonGroup } from "./radiobuttongroup";

export type RadioButtonProps = SKElementProps & { checked?: boolean };

export class RadioButton extends SKElement {
  // MVC components
  private _model: RadioButtonModel;
  private _view: RadioButtonView;
  private _controller: RadioButtonController;

  // Group this radio button belongs to
  private _group: RadioButtonGroup | null = null;

  // colour on hover
  protected _highlightColour = Style.highlightColour;
  set highlightColour(hc: string) {
    this._highlightColour = hc;
  }
  get highlightColour() {
    return this._highlightColour;
  }

  constructor({
    checked = false,
    fill = Style.defaultColour,
    border = "black",
    width = 20,
    height = 20,
    margin = 5,
    ...elementProps
  }: RadioButtonProps = {}) {
    super(elementProps);
    this.fill = fill;
    this.width = width;
    this.height = height;
    this.border = border;

    this._model = new RadioButtonModel(checked);
    this._view = new RadioButtonView(this, this._model);
    this._controller = new RadioButtonController(this, this._model);

    // Initial layout calculations
    this.layout();
  }

  // Draw radio button.
  public draw(gc: CanvasRenderingContext2D): void {
    super.draw(gc);
    this._view.draw(gc);
  }

  // Get/set check state of radio button.
  public get checked() {
    return this._model.checked;
  }
  public set checked(value: boolean) {
    this._model.checked = value;
    this._view.update();
  }

  // Get/set the group this radio button belongs to
  public get group(): RadioButtonGroup | null {
    return this._group;
  }
  public set group(g: RadioButtonGroup | null) {
    this._group = g;
  }

  public sendEvent(e: SKEvent, capture?: boolean): boolean {
    return super.sendEvent(e, capture);
  }

  // Handle mouse events.
  handleMouseEvent(me: SKMouseEvent): boolean {
    this._controller.handleMouseEvent(me);
    return true;
  }
}
