import { 
  setSKEventListener, 
  SKEvent, 
  SKMouseEvent } from "../../simplekit/src/imperative-mode";
import { MapWidget } from ".";
import { MapWidgetModel } from "./MapWidgetModel";

export class MapWidgetController {
  private _map: MapWidget;
  private _model: MapWidgetModel;
  private _currentHoverPointData = {};

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
      this._model.points.forEach((p) => {
            const { x, y } = this._model.latLonToCanvas(
                p.latitude,
                p.longitude,
                this._map.width,
                this._map.height
            );
            // considered a hit if less than 5 pixels away
            if (
              this.calculateDistance(
                this._map.x + x,
                this._map.y + y,
                me.x,
                me.y
              ) <= 5
            ) {
              if (me.type === "mousemove")
              {
                if (
                  this._map.sendEvent({
                    source: this,
                    timeStamp: me.timeStamp,
                    type: "point-hover",
                    data: p
                  } as SKEvent)
                )
                  return true;
              }
              else if (me.type === "click")
              {
                if (
                  this._map.sendEvent({
                    source: this,
                    timeStamp: me.timeStamp,
                    type: "point-click",
                    data: p
                  } as SKEvent)
                )
                  return true;
              }
            }
            else{
              p.dataDisplay = "";
            }
      });
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
