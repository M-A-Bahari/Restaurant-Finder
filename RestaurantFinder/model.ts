// Restaurant interface matching the JSON data structure
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  avg_price: number;
  type: string;
  ratings: number;
  features: string[];
  description: string;
}

// Filter state for the application
export interface FilterState {
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  selectedType: string; // "All" or specific type
  selectedFeatures: Set<string>;
}

 // Model for Restaurant Finder application
 // Manages restaurant data and filtering logic
export class RestaurantFinderModel {
  private allRestaurants: Restaurant[] = [];
  private filteredRestaurants: Restaurant[] = [];
  private filterState: FilterState;
  private selectedRestaurant: Restaurant | null = null;

  constructor(restaurantData: Restaurant[]) {
    this.allRestaurants = restaurantData;
    this.filteredRestaurants = [...restaurantData];

    // Initialize filter state with min/max values
    const prices = restaurantData.map((r) => r.avg_price);
    const ratings = restaurantData.map((r) => r.ratings);

    this.filterState = {
      priceMin: prices.length > 0 ? Math.min(...prices) : 0,
      priceMax: prices.length > 0 ? Math.max(...prices) : 100,
      ratingMin: ratings.length > 0 ? Math.min(...ratings) : 0,
      ratingMax: ratings.length > 0 ? Math.max(...ratings) : 5,
      selectedType: "All",
      selectedFeatures: new Set<string>(),
    };
  }

  // Applies all filters to the restaurant list
  public applyFilters(): void {
    this.filteredRestaurants = this.allRestaurants.filter((restaurant) => {
      // Price filter
      if (
        restaurant.avg_price < this.filterState.priceMin ||
        restaurant.avg_price > this.filterState.priceMax
      ) {
        return false;
      }

      // Rating filter
      if (
        restaurant.ratings < this.filterState.ratingMin ||
        restaurant.ratings > this.filterState.ratingMax
      ) {
        return false;
      }

      // Type filter
      if (
        this.filterState.selectedType !== "All" &&
        restaurant.type !== this.filterState.selectedType
      ) {
        return false;
      }

      // Features filter - restaurant with ALL selected features
      if (this.filterState.selectedFeatures.size > 0) {
        for (const feature of this.filterState.selectedFeatures) {
          if (!restaurant.features.includes(feature)) {
            return false;
          }
        }
      }

      return true;
    });
  }

  // Update price filter
  public updatePriceFilter(min: number, max: number): void {
    this.filterState.priceMin = min;
    this.filterState.priceMax = max;
    this.applyFilters();
  }

  // Update rating filter
  public updateRatingFilter(min: number, max: number): void {
    this.filterState.ratingMin = min;
    this.filterState.ratingMax = max;
    this.applyFilters();
  }

  // Update type filter
  public updateTypeFilter(type: string): void {
    this.filterState.selectedType = type;
    this.applyFilters();
  }

  // Update feature filter (toggle a feature on/off)
  public updateFeatureFilter(feature: string, enabled: boolean): void {
    if (enabled) {
      this.filterState.selectedFeatures.add(feature);
    } else {
      this.filterState.selectedFeatures.delete(feature);
    }
    this.applyFilters();
  }

  // Select a restaurant to display details
  public selectRestaurant(id: number): void {
    const restaurant = this.allRestaurants.find((r) => r.id === id);
    this.selectedRestaurant = restaurant || null;
  }

  // Clear selected restaurant
  public clearSelection(): void {
    this.selectedRestaurant = null;
  }

  // Get filtered restaurants
  public getFilteredRestaurants(): Restaurant[] {
    return this.filteredRestaurants;
  }

  // Get selected restaurant
  public getSelectedRestaurant(): Restaurant | null {
    return this.selectedRestaurant;
  }

  // Get all unique restaurant types from the data
  public getUniqueTypes(): string[] {
    const types = new Set(this.allRestaurants.map((r) => r.type));
    return Array.from(types).sort();
  }

  // Get all unique features from the data
  public getUniqueFeatures(): string[] {
    const features = new Set<string>();
    this.allRestaurants.forEach((r) => {
      r.features.forEach((f) => features.add(f));
    });
    return Array.from(features).sort();
  }

  // Get current filter state (for displaying current values)
  public getFilterState(): FilterState {
    return { ...this.filterState };
  }

  // Get price range from all data (for slider initialization)
  public getPriceRange(): { min: number; max: number } {
    const prices = this.allRestaurants.map((r) => r.avg_price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  // Get rating range from all data (for slider initialization)
  public getRatingRange(): { min: number; max: number } {
    const ratings = this.allRestaurants.map((r) => r.ratings);
    return {
      min: Math.min(...ratings),
      max: Math.max(...ratings),
    };
  }

  
  // Get total restaurant count
  public getTotalCount(): number {
    return this.allRestaurants.length;
  }

  // Get filtered restaurant count
  public getFilteredCount(): number {
    return this.filteredRestaurants.length;
  }
}
