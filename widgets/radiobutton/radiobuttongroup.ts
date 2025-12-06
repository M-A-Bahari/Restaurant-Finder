import { RadioButton } from "./radiobutton";

// RadioButtonGroup has a set of RadioButtons, only one can be selected at a time
export class RadioButtonGroup {
  private _buttons: RadioButton[] = [];
  private _selectedButton: RadioButton | null = null;

  constructor() {}

  // Add a radio button to this group
  public add(button: RadioButton): void {
    // Set the button's group to this group
    button.group = this;

    // Add to our list
    this._buttons.push(button);

    // If this button is already checked, make it the selected one
    if (button.checked) {
      this.select(button);
    }

    // Listen for action events from this button
    button.addEventListener("action", () => {
      this.select(button);
    });
  }

  // Select a specific button (and deselect all others)
  public select(button: RadioButton): void {
    // Deselect all buttons
    this._buttons.forEach((btn) => {
      if (btn !== button) {
        btn.checked = false;
      }
    });

    // Select the specified button
    button.checked = true;
    this._selectedButton = button;
  }

  // Get the currently selected button
  public get selected(): RadioButton | null {
    return this._selectedButton;
  }

  // Get all buttons in this group
  public get buttons(): RadioButton[] {
    return this._buttons;
  }

  // Remove a button from this group
  public remove(button: RadioButton): void {
    const index = this._buttons.indexOf(button);
    if (index > -1) {
      this._buttons.splice(index, 1);
      button.group = null;

      if (this._selectedButton === button) {
        this._selectedButton = null;
      }
    }
  }

  //Clear all buttons from this group
  public clear(): void {
    this._buttons.forEach((btn) => {
      btn.group = null;
    });
    this._buttons = [];
    this._selectedButton = null;
  }
}
