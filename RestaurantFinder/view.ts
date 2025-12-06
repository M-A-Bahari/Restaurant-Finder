import { SKContainer, SKLabel } from "../simplekit/src/imperative-mode";
import { RestaurantFinderModel, Restaurant } from "./model";
import { RadioButton, RadioButtonGroup } from "../widgets/radiobutton";
import { Slider } from "../widgets/slider";
import { CheckBox } from "../widgets/checkbox";
import { MapWidget, MapPoint } from "../widgets/MapWidget";

// View for Restaurant Finder application
export class RestaurantFinderView {
  private model: RestaurantFinderModel;

  // Main containers
  private rootContainer: SKContainer;
  private filterPanel: SKContainer;
  private mapContainer: SKContainer;
  private detailPanel: SKContainer;

  // Filter widgets
  private typeRadioGroup: RadioButtonGroup = new RadioButtonGroup;
  private typeRadioButtons: Map<string, RadioButton> = new Map();

  private priceMinSlider: Slider | undefined;
  private priceMaxSlider: Slider | undefined;
  private priceMinLabel: SKLabel | undefined;
  private priceMaxLabel: SKLabel | undefined;

  private ratingMinSlider: Slider | undefined;
  private ratingMaxSlider: Slider | undefined;
  private ratingMinLabel: SKLabel | undefined;
  private ratingMaxLabel: SKLabel | undefined;

  private featureCheckboxes: Map<string, CheckBox> = new Map();

  // Map widget
  private mapWidget: MapWidget;

  // Detail display labels
  private detailNameLabel: SKLabel | undefined;
  private detailTypeLabel: SKLabel | undefined;
  private detailPriceLabel: SKLabel | undefined;
  private detailRatingLabel: SKLabel | undefined;
  private detailFeaturesLabel: SKLabel | undefined;
  private detailDescriptionLabel: SKLabel | undefined;
  private detailAddressLabel: SKLabel | undefined;

  // Status label
  private statusLabel: SKLabel | undefined;

  constructor(model: RestaurantFinderModel) {
    this.model = model;

    // Create root container
    this.rootContainer = new SKContainer({
      x: 0,
      y: 0,
      width: 1200,
      height: 700,
      fill: "#d6d2faff",
    });

    // Create header container with colored background
    const headerContainer = new SKContainer({
      x: 10,
      y: 10,
      width: 1420,
      height: 59,
      fill: "#5b3aa3ff",
      border: "#35247cff",
    });
    this.rootContainer.addChild(headerContainer);

    // Create header label
    const headerLabel = new SKLabel({
      text: "Restaurant Finder",
      x: 590,
      y: 12
    });
    headerLabel.font = "bold 45px sans-serif";
    headerLabel.fontColour = "#ffffffff";
    this.rootContainer.addChild(headerLabel);

    // Create main sections
    this.filterPanel = this.createFilterPanel();
    this.mapContainer = this.createMapContainer();
    this.detailPanel = this.createDetailPanel();

    // Add sections to root
    this.rootContainer.addChild(this.filterPanel);
    this.rootContainer.addChild(this.mapContainer);
    this.rootContainer.addChild(this.detailPanel);

    // Initialize map
    this.mapWidget = this.createMapWidget();
    this.mapContainer.addChild(this.mapWidget);

    // Create type radio buttons
    this.createTypeFilters();

    // Create price sliders
    this.createPriceSliders();

    // Create rating sliders
    this.createRatingSliders();

    // Create feature checkboxes
    this.createFeatureCheckboxes();

    // Create detail labels
    this.createDetailLabels();

    // Create status label
    this.createStatusLabel();

    // Initial refresh
    this.refresh();
  }

  // Create filter panel container
  private createFilterPanel(): SKContainer {
    return new SKContainer({
      x: 10,
      y: 70,
      width: 300,
      height: 650,
      fill: "#cececeff",
      border: "#8f8e8eff",
    });
  }

  // Create map container
  private createMapContainer(): SKContainer {
    return new SKContainer({
      x: 320,
      y: 70,
      width: 1110,
      height: 540,
      fill: "#cccccc",
      border: "#cccccc",
    });
  }

  // Create detail panel container
  private createDetailPanel(): SKContainer {
    return new SKContainer({
      x: 320,
      y: 610,
      width: 1110,
      height: 110,
      fill: "#cccccc",
      border: "#cccccc",
    });
  }

  // Create map widget with initial data
  private createMapWidget(): MapWidget {
    const mapPoints = this.convertRestaurantsToMapPoints(
      this.model.getFilteredRestaurants()
    );

    return new MapWidget(mapPoints, {
      x: 10,
      y: 10,
      width: 1090,
      height: 500,
      fill: "#e8f5e9",
      border: "#333333",
    });
  }

  // Convert restaurants to MapPoint format
  private convertRestaurantsToMapPoints(restaurants: Restaurant[]): MapPoint[] {
    return restaurants.map((r) => ({
      latitude: r.latitude,
      longitude: r.longitude,
      data: r,
      dataDisplay: `${r.type} – ${r.ratings.toFixed(1)}`,
    }));
  }

  // Create type filter radio buttons
  private createTypeFilters(): void {
    this.typeRadioGroup = new RadioButtonGroup();

    const types = ["All", ...this.model.getUniqueTypes()];
    let yPos = 40;

    // Title
    const typeTitle = new SKLabel({
      text: "Restaurant Type:",
      x: 10,
      y: 10,
    });
    typeTitle.font = "bold 20px sans-serif"
    this.filterPanel.addChild(typeTitle);

    // Create radio button for each type
    types.forEach((type) => {
      const radio = new RadioButton({
        checked: type === "All",
        x: 15,
        y: yPos,
        width: 16,
        height: 16,
      });

      const label = new SKLabel({
        text: type,
        x: 38,
        y: yPos - 6,
      });
      label.font = "20px sans-serif";

      this.typeRadioGroup.add(radio);
      this.typeRadioButtons.set(type, radio);
      this.filterPanel.addChild(radio);
      this.filterPanel.addChild(label);

      yPos += 25;
    });
  }

  // Create price filter sliders
  private createPriceSliders(): void {
    const priceRange = this.model.getPriceRange();
    let yPos = 25 + (this.typeRadioButtons.size + 1) * 25;

    // Title
    const priceTitle = new SKLabel({
      text: "Price Range (💲):", x: 10, y: yPos});
    priceTitle.font = "bold 20px sans-serif"
    this.filterPanel.addChild(priceTitle);
    yPos += 25;

    // Min price slider
    this.priceMinLabel = new SKLabel({
      text: `Min: $${Math.round(priceRange.min)}`, x: 10, y: yPos});
    this.priceMinLabel.font = "20px sans-serif";
    this.filterPanel.addChild(this.priceMinLabel);
    yPos += 20;

    this.priceMinSlider = new Slider({
      value: priceRange.min,
      min: priceRange.min,
      max: priceRange.max,
      x: 10,
      y: yPos,
      width: 260,
      height: 25,
    });
    this.filterPanel.addChild(this.priceMinSlider);
    yPos += 20;

    // Max price slider
    this.priceMaxLabel = new SKLabel({
      text: `Max: $${Math.round(priceRange.max)}`,
      x: 10,
      y: yPos,
    });
    this.priceMaxLabel.font = "20px sans-serif";
    this.filterPanel.addChild(this.priceMaxLabel);
    yPos += 20;

    this.priceMaxSlider = new Slider({
      value: priceRange.max,
      min: priceRange.min,
      max: priceRange.max,
      x: 10,
      y: yPos,
      width: 260,
      height: 25,
    });
    this.filterPanel.addChild(this.priceMaxSlider);
  }

  // Create rating filter sliders
  private createRatingSliders(): void {
    const ratingRange = this.model.getRatingRange();
    let yPos = (this.typeRadioButtons.size + 1) * 25 + 145;

    // Title
    const ratingTitle = new SKLabel({
      text: "Rating Range: (⭐)",
      x: 10,
      y: yPos,
    });
    ratingTitle.font = "bold 20px sans-serif";
    this.filterPanel.addChild(ratingTitle);
    yPos += 25;

    // Min rating slider
    this.ratingMinLabel = new SKLabel({
      text: `Min: ${ratingRange.min.toFixed(1)}`,
      x: 10,
      y: yPos,
    });
    this.ratingMinLabel.font = "20px sans-serif";
    this.filterPanel.addChild(this.ratingMinLabel);
    yPos += 20;

    this.ratingMinSlider = new Slider({
      value: ratingRange.min,
      min: ratingRange.min,
      max: ratingRange.max,
      x: 10,
      y: yPos,
      width: 260,
      height: 25,
      trackFillColor: "#FF9800",
    });
    this.filterPanel.addChild(this.ratingMinSlider);
    yPos += 20;

    // Max rating slider
    this.ratingMaxLabel = new SKLabel({
      text: `Max: ${ratingRange.max.toFixed(1)}`,
      x: 10,
      y: yPos,
    });
    this.ratingMaxLabel.font = "20px sans-serif";
    this.filterPanel.addChild(this.ratingMaxLabel);
    yPos += 20;

    this.ratingMaxSlider = new Slider({
      value: ratingRange.max,
      min: ratingRange.min,
      max: ratingRange.max,
      x: 10,
      y: yPos,
      width: 260,
      height: 25,
      trackFillColor: "#FF9800",
    });
    this.filterPanel.addChild(this.ratingMaxSlider);
  }

  // Create feature filter checkboxes
  private createFeatureCheckboxes(): void {
    const features = this.model.getUniqueFeatures();
    let yPos = 40 + (this.typeRadioButtons.size + 1) * 25 + 225;

    // Title
    const featureTitle = new SKLabel({
      text: "Features:",
      x: 10,
      y: yPos,
    });
    featureTitle.font = "bold 20px sans-serif";
    this.filterPanel.addChild(featureTitle);
    yPos += 25;

    // Create checkbox for each feature
    features.forEach((feature) => {
      const checkbox = new CheckBox({
        checked: false,
        x: 16,
        y: yPos + 10,
        width: 16,
        height: 16,
      });

      const label = new SKLabel({
        text: feature,
        x: 40,
        y: yPos + 3,
      });
      label.font = "20px sans-serif";

      this.featureCheckboxes.set(feature, checkbox);
      this.filterPanel.addChild(checkbox);
      this.filterPanel.addChild(label);

      yPos += 25;
    });
  }

  // Create detail panel labels
  private createDetailLabels(): void {
    const detailTitle = new SKLabel({
      text: "Restaurant Details:",
      x: 15,
      y: 0,
    });
    detailTitle.font = "bold 20px sans-serif";
    this.detailPanel.addChild(detailTitle);

    this.detailNameLabel = new SKLabel({
      text: "Hover over a restaurant marker",
      x: 15,
      y: 20,
    });
    this.detailNameLabel.font = "bold 18px sans-serif";
    this.detailPanel.addChild(this.detailNameLabel);

    this.detailTypeLabel = new SKLabel({
      text: "",
      x: 15,
      y: 40,
    });
    this.detailTypeLabel.font = "bold 18px sans-serif";
    this.detailPanel.addChild(this.detailTypeLabel);

    this.detailRatingLabel = new SKLabel({
      text: "",
      x: 150,
      y: 40,
    });
    this.detailRatingLabel.font = "18px sans-serif";
    this.detailPanel.addChild(this.detailRatingLabel);

    this.detailPriceLabel = new SKLabel({
      text: "",
      x: 300,
      y: 40,
    });
    this.detailPriceLabel.font = "18px sans-serif";
    this.detailPanel.addChild(this.detailPriceLabel);

    this.detailFeaturesLabel = new SKLabel({
      text: "",
      x: 500,
      y: 40,
    });
    this.detailFeaturesLabel.font = "18px sans-serif";
    this.detailPanel.addChild(this.detailFeaturesLabel);

    this.detailDescriptionLabel = new SKLabel({
      text: "",
      x: 15,
      y: 60,
    });
    this.detailDescriptionLabel.font = "18px sans-serif";
    this.detailPanel.addChild(this.detailDescriptionLabel);

    this.detailAddressLabel = new SKLabel({
      text: "",
      x: 15,
      y: 80,
    });
    this.detailAddressLabel.font = "18px sans-serif";
    this.detailPanel.addChild(this.detailAddressLabel);
  }

  // Create status label showing filter results
  private createStatusLabel(): void {
    this.statusLabel = new SKLabel({
      text: "",
      x: 15,
      y: 510,
    });
    this.statusLabel.font = "20px sans-serif";
    this.mapContainer.addChild(this.statusLabel);
  }

  // Refresh the view with current model data
  public refresh(): void {
    // Update map with filtered restaurants
    const filteredRestaurants = this.model.getFilteredRestaurants();
    const mapPoints = this.convertRestaurantsToMapPoints(filteredRestaurants);

    // Remove old map widget and create new one
    this.mapContainer.removeChild(this.mapWidget);
    this.mapWidget = new MapWidget(mapPoints, {
      x: 10,
      y: 10,
      width: 1090,
      height: 500,
      fill: "#e8f5e9",
      border: "#333333",
    });
    this.mapContainer.addChild(this.mapWidget);

    // Update status label
    this.statusLabel!.text = `Showing ${this.model.getFilteredCount()} of ${this.model.getTotalCount()} restaurants`;

    // Update detail panel if a restaurant is selected
    this.updateDetailPanel();
  }

  // Update detail panel with selected restaurant
  public updateDetailPanel(): void {
    const selected = this.model.getSelectedRestaurant();

    if (selected && this.detailNameLabel) {
      this.detailNameLabel.text = selected.name;
      this.detailTypeLabel!.text = selected.type;
      this.detailRatingLabel!.text = `Ratings(⭐) ${selected.ratings.toFixed(1)}`;
      this.detailPriceLabel!.text = `Avg_Price(💲) ${selected.avg_price}`;

      // Check for specific features - compact format
      const hasParking = selected.features.some(f => f.toLowerCase().includes('parking'));
      const hasPets = selected.features.some(f => f.toLowerCase().includes('pet'));
      this.detailFeaturesLabel!.text = `Parking:${hasParking ? 'Yes' : 'No'} Pets:${hasPets ? 'Yes' : 'No'}`;

      this.detailDescriptionLabel!.text = selected.description;
      this.detailAddressLabel!.text = selected.address;
    } else if (this.detailNameLabel) {
      this.detailNameLabel.text = "Hover over a restaurant marker";
      this.detailTypeLabel!.text = "";
      this.detailRatingLabel!.text = "";
      this.detailPriceLabel!.text = "";
      this.detailFeaturesLabel!.text = "";
      this.detailDescriptionLabel!.text = "";
      this.detailAddressLabel!.text = "";
    }
  }

  // Update details with restaurant data (for hover functionality)
  public updateDetails(restaurant: Restaurant): void {
    if (!this.detailNameLabel) return;

    this.detailNameLabel.text = restaurant.name;
    this.detailTypeLabel!.text = restaurant.type;
    this.detailRatingLabel!.text = `Ratings(⭐) ${restaurant.ratings.toFixed(1)}`;
    this.detailPriceLabel!.text = `Avg_Price(💲) ${restaurant.avg_price}.00`;

    // Check for specific features - compact format
    const hasParking = restaurant.features.some(f => f.toLowerCase().includes('parking'));
    const hasPets = restaurant.features.some(f => f.toLowerCase().includes('pet'));
    this.detailFeaturesLabel!.text = `Parking:${hasParking ? 'Yes,' : 'No,'} Pets:${hasPets ? 'Yes' : 'No'}`;

    this.detailDescriptionLabel!.text = `Description: ${restaurant.description}`;
    this.detailAddressLabel!.text = `Address: ${restaurant.address}`;
  }

  // Update price labels
  public updatePriceLabels(min: number, max: number): void {
    if (this.priceMinLabel && this.priceMaxLabel) {
      this.priceMinLabel.text = `Min: $${Math.round(min)}`;
      this.priceMaxLabel.text = `Max: $${Math.round(max)}`;
    }
  }

  // Update rating labels
  public updateRatingLabels(min: number, max: number): void {
    if (this.ratingMinLabel && this.ratingMaxLabel) {
      this.ratingMinLabel.text = `Min: ${min.toFixed(1)}`;
      this.ratingMaxLabel.text = `Max: ${max.toFixed(1)}`;
    }
  }

  // Getters for widgets (needed by controller)
  public getTypeRadioButtons(): Map<string, RadioButton> {
    return this.typeRadioButtons;
  }

  public getPriceMinSlider(): Slider | undefined {
    return this.priceMinSlider;
  }

  public getPriceMaxSlider(): Slider | undefined {
    return this.priceMaxSlider;
  }

  public getRatingMinSlider(): Slider | undefined {
    return this.ratingMinSlider;
  }

  public getRatingMaxSlider(): Slider | undefined {
    return this.ratingMaxSlider;
  }

  public getFeatureCheckboxes(): Map<string, CheckBox> {
    return this.featureCheckboxes;
  }

  public getMapWidget(): MapWidget {
    return this.mapWidget;
  }

  public getRootContainer(): SKContainer {
    return this.rootContainer;
  }
}
