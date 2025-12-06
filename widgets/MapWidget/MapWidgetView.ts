import { MapWidget, MapPoint } from ".";
import { MapWidgetModel } from "./MapWidgetModel";

export class MapWidgetView {
  private _map: MapWidget;
  private _model: MapWidgetModel;

  constructor(map: MapWidget, model: MapWidgetModel) {
    this._model = model;
    this._map = map;
  }
  // a list of functions that will be called to draw different map features (e.g., a river or roads)
  public drawMapFeatureFunctions: Array<
    (
      gc: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number | undefined,
      height: number | undefined
    ) => void
  > = [];

  // Function to draw a red circle at a given latitude and longitude
  // todo: provide properties for drawing of markers to allow styling
  public drawMarker(
    gc: CanvasRenderingContext2D,
    lat: number,
    lon: number,
    displayData: string,
    _data: {},
    isHovered: boolean = false
  ) {
    const { x, y } = this._model.latLonToCanvas(
      lat,
      lon,
      this._map.width,
      this._map.height
    );
    gc.save();
    gc.translate(this._map.x, this._map.y);
    // console.log(lat, lon, this._width, this._height);
    gc.beginPath();
    gc.arc(x, y, 5, 0, 2 * Math.PI);
    gc.fillStyle = "red";
    gc.fill();
    gc.closePath();

    // Only show tooltip when hovered
    if (isHovered && displayData) {
      gc.fillStyle = "black";
      gc.font = "12px Arial";

      // Measure text to create background
      const textMetrics = gc.measureText(displayData);
      const textWidth = textMetrics.width;
      const textHeight = 14;
      const padding = 4;

      // Draw tooltip background
      gc.fillStyle = "rgba(255, 255, 255, 0.9)";
      gc.fillRect(
        x - textWidth / 2 - padding,
        y - 20 - textHeight - padding,
        textWidth + padding * 2,
        textHeight + padding * 2
      );

      // Draw tooltip border
      gc.strokeStyle = "black";
      gc.lineWidth = 1;
      gc.strokeRect(
        x - textWidth / 2 - padding,
        y - 20 - textHeight - padding,
        textWidth + padding * 2,
        textHeight + padding * 2
      );

      // Draw text
      gc.fillStyle = "black";
      gc.textAlign = "center";
      gc.textBaseline = "middle";
      gc.fillText(displayData, x, y - 20 - textHeight / 2);
    }

    gc.restore();
  }

  //draw the widget
  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    if (this._map.fill!) {
      gc.fillStyle = this._map.fill;
      gc.fillRect(
        this._map.x!,
        this._map.y!,
        this._map.width!,
        this._map.height!
      );
    }

    //call any map drawing functions to display map features
    this.drawMapFeatureFunctions.forEach((func) => {
      func(gc, this._map.x, this._map.y, this._map.width, this._map.height);
    });

    // Draw each marker on the map

    this._model.points.forEach((property: MapPoint) => {
      const { latitude, longitude } = property;
      this.drawMarker(
        gc,
        latitude,
        longitude,
        property.dataDisplay,
        property.data,
        property.isHovered || false
      );
    });

    //draw the border if there is one
    if (this._map.border) {
      gc.strokeStyle = this._map.border;
      gc.lineWidth = 1;
      let w = this._map.width || 0;
      let h = this._map.height || 0;
      gc.strokeRect(this._map.x, this._map.y, w, h);
    }
    gc.restore();
  }
}