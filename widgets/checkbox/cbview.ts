import { CheckBoxModel } from "./cbmodel";
import { CheckBox } from "./checkbox";

export class CheckBoxView
{
    // Reference to the Checkbox widget and its model
    private _checkbox: CheckBox;
    private _model: CheckBoxModel;
    private VIEW_WIDTH?: number;
    private VIEW_HEIGHT?: number;

    // Constructor for CheckboxView
    constructor(checkbox: CheckBox, model: CheckBoxModel)
    {
        this._checkbox = checkbox;
        this._model = model;
        this.VIEW_WIDTH = this._checkbox.width;
        this.VIEW_HEIGHT = this._checkbox.height;
    }

    // Draws the checkbox onto the provided graphics context
    public draw(gc: CanvasRenderingContext2D): void
    {   
        gc.save();
        gc.translate(this._checkbox.margin, this._checkbox.margin);
        gc.translate(this._checkbox.x, this._checkbox.y);
        gc.beginPath();
        gc.fillStyle = this._checkbox.fill;
        if (this.VIEW_WIDTH !== undefined && this.VIEW_HEIGHT !== undefined)
            gc.rect(0, 0, this.VIEW_WIDTH, this.VIEW_HEIGHT);
        gc.fill();
        if(this._model.state === "hover")
            gc.strokeStyle = this._checkbox.highlightColour;
        else
            gc.strokeStyle = this._checkbox.border;
        gc.lineWidth = 2;
        gc.stroke();
        gc.closePath();
        if(this._model.checked)
        {
            gc.save();
            gc.beginPath();
            gc.fillStyle = "black";
            gc.font = (this.VIEW_HEIGHT)+"px Arial";

            //see: www.w3schools.com/TAgs/canvas_textbaseline.asp
            https: gc.textAlign = "left";
            gc.textBaseline = "alphabetic";

            if (this.VIEW_WIDTH !== undefined && this.VIEW_HEIGHT !== undefined)
                gc.fillText("✔",
                    this.VIEW_WIDTH * 0.1,
                    this.VIEW_HEIGHT * 0.9
                );

            gc.fill();
            gc.closePath();
            gc.restore();
        }
        
        gc.restore();
    }

    // Update view whenever model is modified.
    public update(): void
    {
        // Currently nothing to do here.
        // draw() will always render current model state.
        return;
    }
}