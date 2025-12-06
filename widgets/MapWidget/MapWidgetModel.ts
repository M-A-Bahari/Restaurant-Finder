import { MapPoint } from "./MapWidget";

export class MapWidgetModel {
  private _points: MapPoint[] = []; //points to be drawn on the map

  private _minLon: number = 0;
  private _maxLon: number = 0;
  private _minLat: number = 0;
  private _maxLat: number = 0;

  constructor(points: MapPoint[]) {
    this.points = points;
  }

  public get points(): MapPoint[] {
    return this._points;
  }

  public set points(points: MapPoint[]) {
    this._points = points;
    this._setMinMax();
  }

  private _setMinMax(): void {
    //determine the min and max values for scaling
    //the map while drawing, so that everything is visible

    // Handle empty array case
    if (this._points.length === 0) {
      this._minLon = 0;
      this._minLat = 0;
      this._maxLon = 1;
      this._maxLat = 1;
      return;
    }

    this._minLon =
      this._points.reduce((prev, curr) =>
        prev.longitude < curr.longitude ? prev : curr
      ).longitude - 0.0015;
    this._minLat =
      this._points.reduce((prev, curr) =>
        prev.latitude < curr.latitude ? prev : curr
      ).latitude - 0.0015;
    this._maxLon =
      this._points.reduce((prev, curr) =>
        prev.longitude > curr.longitude ? prev : curr
      ).longitude + 0.0015;
    this._maxLat =
      this._points.reduce((prev, curr) =>
        prev.latitude > curr.latitude ? prev : curr
      ).latitude + 0.0015;
  }

  // Function to convert latitude and longitude to canvas coordinates
  public latLonToCanvas(
    lat: number,
    lon: number,
    canvasWidth: number = 400,
    canvasHeight: number = 400
  ) {
    // Avoid division by zero
    const lonRange = this._maxLon - this._minLon;
    const latRange = this._maxLat - this._minLat;

    const x = lonRange !== 0
      ? ((lon - this._minLon) / lonRange) * canvasWidth
      : canvasWidth / 2;
    const y = latRange !== 0
      ? canvasHeight - ((lat - this._minLat) / latRange) * canvasHeight
      : canvasHeight / 2;

    return { x, y };
  }
}