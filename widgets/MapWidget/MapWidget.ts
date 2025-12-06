import { SKElement } from "../../simplekit/src/widget/";
import { SKEvent, SKMouseEvent } from "../../simplekit/src/events";
import { MapWidgetController } from "./MapWidgetController";
import { MapWidgetModel } from "./MapWidgetModel";
import { MapWidgetView } from "./MapWidgetView";

// A Map Widget for SimpleKit that displays an interactive map
export class MapWidget extends SKElement {
  private _model: MapWidgetModel;
  private _view: MapWidgetView;
  private _controller: MapWidgetController;

  constructor(
    points: MapPoint[],
    {
      x = 320,
      y = 70,
      width = 1090,
      height = 500,
      fill = "lightgreen",
      border = "black",
    } = {}
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill,
      border: border,
    });
    this._model = new MapWidgetModel(points);
    this._view = new MapWidgetView(this, this._model);
    this._controller = new MapWidgetController(this, this._model);
  }

  draw(gc: CanvasRenderingContext2D) {
    super.draw(gc);
    this._view.draw(gc);
  }

  public sendEvent(e: SKEvent, capture?: boolean): boolean {
    return super.sendEvent(e, capture);
  }

  // Handle mouse events.
  handleMouseEvent(me: SKMouseEvent): boolean {
    this._controller.handleMouseEvent(me);
    return false;
  }

  public get drawMapFeatureFunctions(): Array<
    (
      gc: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number | undefined,
      height: number | undefined,
      data: {} | undefined
    ) => void
  > {
    return this._view.drawMapFeatureFunctions;
  }

  // Get absolute X position of the widget in screen coordinates
  public get absoluteX(): number {
    return 330; // 320 (mapContainer.x) + 10 (mapWidget.x)
  }

  // Get absolute Y position of the widget in screen coordinates
  public get absoluteY(): number {
    return 80; // 70 (mapContainer.y) + 10 (mapWidget.y)
  }
}

// Define the property interface based on JSON structure
export interface MapPoint {
    latitude: number;
    longitude: number;
    data: {};
    dataDisplay: string;
    isHovered?: boolean;
}