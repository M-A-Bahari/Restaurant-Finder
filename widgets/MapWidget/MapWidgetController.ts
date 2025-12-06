import { SKEvent, SKMouseEvent } from "../../simplekit/src/imperative-mode";
import { MapWidget } from ".";
import { MapWidgetModel } from "./MapWidgetModel";

export class MapWidgetController {
  private _map: MapWidget;
  private _model: MapWidgetModel;
  private _currentHoverPointData = {};
  private _lastHoveredPoint: any = null;

  public get currentHoverPointData() {
    return this._currentHoverPointData;
  }

  public eventHandlers: Array<
    (
      e: SKEvent,
      map: MapWidget,
      model: MapWidgetModel
    ) => void
  > = [];

  constructor(map: MapWidget, model: MapWidgetModel) {
    this._map = map;
    this._model = model;
  }

  handleMouseEvent(me: SKMouseEvent) {
      let foundHover = false;
      let hoveredPoint: any = null;

      // Find the hovered point
      for (const p of this._model.points) {
            const { x, y } = this._model.latLonToCanvas(
                p.latitude,
                p.longitude,
                this._map.width,
                this._map.height
            );

            // Mouse coordinates are in absolute screen space
            // Adjust them to be relative to the map widget
            const mouseX = me.x - this._map.absoluteX;
            const mouseY = me.y - this._map.absoluteY;

            // Marker position is at this._map.x + x, this._map.y + y
            // considered a hit if less than 10 pixels away
            if (
              this.calculateDistance(
                this._map.x + x,
                this._map.y + y,
                mouseX,
                mouseY
              ) <= 10
            ) {
              foundHover = true;
              hoveredPoint = p;
              break; // Stop at first match
            }
      }

      if (me.type === "mousemove") {
        if (foundHover && hoveredPoint) {
          // Update hover state
          if (this._lastHoveredPoint !== hoveredPoint) {
            // Clear previous hover
            if (this._lastHoveredPoint) {
              this._lastHoveredPoint.isHovered = false;
            }
            // Set new hover
            hoveredPoint.isHovered = true;
            this._lastHoveredPoint = hoveredPoint;

            // Send hover event
            this._map.sendEvent({
              source: this,
              timeStamp: me.timeStamp,
              type: "point-hover",
              data: hoveredPoint
            } as SKEvent);
          }
        } else if (!foundHover && this._lastHoveredPoint) {
          // Clear hover when moving away
          this._lastHoveredPoint.isHovered = false;
          this._lastHoveredPoint = null;
        }
      } else if (me.type === "click" && foundHover && hoveredPoint) {
        // Send click event
        this._map.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "point-click",
          data: hoveredPoint
        } as SKEvent);
      }
  }

  public calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public runHandlers(e:SKEvent) {
    this.eventHandlers.forEach((func)=>{
        func(e, this._map, this._model);
    });
  }
}
