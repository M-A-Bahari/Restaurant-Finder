import { SKEvent, SKMouseEvent } from "../../simplekit/src/imperative-mode";
import { RadioButtonModel } from "./rbmodel";
import { RadioButton } from "./radiobutton";

export class RadioButtonController {
  private _radioButton: RadioButton;
  private _model: RadioButtonModel;

  public eventHandlers: Array<
    (e: SKEvent, radioButton: RadioButton, model: RadioButtonModel) => void
  > = [];

  constructor(radioButton: RadioButton, model: RadioButtonModel) {
    this._radioButton = radioButton;
    this._model = model;
  }

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this._model.state = "check-started";
        break;
      case "mouseup":
        if (this._model.state === "check-started") {
          this._model.state = "hover";
          // Radio buttons can only be checked, not unchecked directly
          if (!this._model.checked) {
            this._model.checked = true;

            if (
              this._radioButton.sendEvent({
                source: this,
                timeStamp: me.timeStamp,
                type: "action",
              } as SKEvent)
            )
              return true;
          }
        }
        break;

      case "mouseenter":
        this._model.state = "hover";
        break;
      case "mouseexit":
        this._model.state = "idle";
        break;
    }

    return false;
  }
}
