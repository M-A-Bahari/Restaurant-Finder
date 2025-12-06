// Model for RadioButton widget
export class RadioButtonModel {
  private _state: "idle" | "check-started" | "hover" = "idle";
  private _checkedValue: boolean = false;

  constructor(isChecked: boolean) {
    this._checkedValue = isChecked;
  }

  public get checked() {
    return this._checkedValue;
  }

  public set checked(value: boolean) {
    this._checkedValue = value;
  }

  public get state() {
    return this._state;
  }
  public set state(value) {
    this._state = value;
  }
}
