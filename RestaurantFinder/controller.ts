import { SKEvent } from "../simplekit/src/imperative-mode";
import { RestaurantFinderModel, Restaurant } from "./model";
import { RestaurantFinderView } from "./view";

//Controller for Restaurant Finder application
export class RestaurantFinderController {
  private model: RestaurantFinderModel;
  private view: RestaurantFinderView;

  constructor(model: RestaurantFinderModel, view: RestaurantFinderView) {
    this.model = model;
    this.view = view;

    // all event listeners
    this.setupEventListeners();
  }

  // event listeners for all UI widgets
  private setupEventListeners(): void {
    // radio buttons
    this.setupTypeFilterListeners();

    // Price sliders
    this.setupPriceSliderListeners();

    // Rating sliders
    this.setupRatingSliderListeners();

    // Feature checkboxes
    this.setupFeatureCheckboxListeners();

    // Map interactions
    this.setupMapListeners();
  }

  // radio button listeners
  private setupTypeFilterListeners(): void {
    const radioButtons = this.view.getTypeRadioButtons();

    radioButtons.forEach((radio, type) => {
      radio.addEventListener("action", () => {
        this.handleTypeChange(type);
      });
    });
  }

  // price slider listeners
  private setupPriceSliderListeners(): void {
    const minSlider = this.view.getPriceMinSlider();
    const maxSlider = this.view.getPriceMaxSlider();

    if (minSlider) {
      minSlider.addEventListener("action", () => {
        this.handlePriceChange();
      });
    }

    if (maxSlider) {
      maxSlider.addEventListener("action", () => {
        this.handlePriceChange();
      });
    }
  }

  // rating slider listeners
  private setupRatingSliderListeners(): void {
    const minSlider = this.view.getRatingMinSlider();
    const maxSlider = this.view.getRatingMaxSlider();

    if (minSlider) {
      minSlider.addEventListener("action", () => {
        this.handleRatingChange();
      });
    }

    if (maxSlider) {
      maxSlider.addEventListener("action", () => {
        this.handleRatingChange();
      });
    }
  }

  // feature checkbox listeners
  private setupFeatureCheckboxListeners(): void {
    const checkboxes = this.view.getFeatureCheckboxes();

    checkboxes.forEach((checkbox, feature) => {
      checkbox.addEventListener("action", () => {
        this.handleFeatureToggle(feature, checkbox.checked);
      });
    });
  }

  // map interaction listeners
  private setupMapListeners(): void {
    const mapWidget = this.view.getMapWidget();

    // Listen for point-click events (restaurant selection)
    mapWidget.addEventListener("point-click", (e: SKEvent) => {
      const pointData = (e as any).data;
      if (pointData && pointData.data) {
        const restaurant = pointData.data as Restaurant;
        this.handleRestaurantClick(restaurant.id);
      }
    });

    // Listen for point-hover events (restaurant details pops up on hover)
    mapWidget.addEventListener("point-hover", (e: SKEvent) => {
      const pointData = (e as any).data;
      if (pointData && pointData.data) {
        const restaurant = pointData.data as Restaurant;
        this.handleRestaurantHover(restaurant);
      }
    });
  }

  // Handles type filter change
  private handleTypeChange(type: string): void {
    this.model.updateTypeFilter(type);
    this.refreshView();
  }

  // Handles price filter change
  private handlePriceChange(): void {
    const minSlider = this.view.getPriceMinSlider();
    const maxSlider = this.view.getPriceMaxSlider();

    if (!minSlider || !maxSlider) return;

    let min = minSlider.value;
    let max = maxSlider.value;

    // checks min doesn't exceed max
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
      minSlider.value = min;
      maxSlider.value = max;
    }

    // Update model
    this.model.updatePriceFilter(min, max);

    // Update labels
    this.view.updatePriceLabels(min, max);

    // Refresh view
    this.refreshView();
  }

  // Handles rating filter change
  private handleRatingChange(): void {
    const minSlider = this.view.getRatingMinSlider();
    const maxSlider = this.view.getRatingMaxSlider();

    if (!minSlider || !maxSlider) return;

    let min = minSlider.value;
    let max = maxSlider.value;

    // checks min doesn't exceed max
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
      minSlider.value = min;
      maxSlider.value = max;
    }

    // Update model
    this.model.updateRatingFilter(min, max);

    // Update labels
    this.view.updateRatingLabels(min, max);

    // Refresh view
    this.refreshView();
  }

  // Handles feature checkbox toggle
  private handleFeatureToggle(feature: string, enabled: boolean): void {
    this.model.updateFeatureFilter(feature, enabled);
    this.refreshView();
  }

  // Handles restaurant marker click
  private handleRestaurantClick(restaurantId: number): void {
    this.model.selectRestaurant(restaurantId);
    this.view.updateDetailPanel();
  }

  // Handles restaurant marker hover
  private handleRestaurantHover(restaurant: Restaurant): void {
    this.view.updateDetails(restaurant);
  }

  // Refreshs the view with current model data
  private refreshView(): void {
    this.view.refresh();
    this.setupMapListeners();
  }
}
