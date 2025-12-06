// Main entry point for the Restaurant Finder application
import { startSimpleKit, setSKRoot } from "./simplekit/src/imperative-mode";
import { RestaurantFinderController, RestaurantFinderModel, RestaurantFinderView} from "./RestaurantFinder";
import { Restaurant } from "./RestaurantFinder/model";

// Initialize and start the Restaurant Finder application
async function main() {
  try {
    // Load restaurant data from JSON file
    const response = await fetch("./fredericton_restaurants.json");
    if (!response.ok) {
      throw new Error(`Failed to load restaurant data: ${response.statusText}`);
    }

    const restaurantData: Restaurant[] = await response.json();
    console.log(`Loaded ${restaurantData.length} restaurants`);

    // Create MVC components
    const model = new RestaurantFinderModel(restaurantData);
    const view = new RestaurantFinderView(model);
    // Controller sets up all event listeners in its constructor
    new RestaurantFinderController(model, view);

    // Set up the application root
    setSKRoot(view.getRootContainer());

    // Start SimpleKit rendering
    startSimpleKit();

    console.log("Restaurant Finder application started successfully!");
  } catch (error) {
    console.error("Error starting Restaurant Finder:", error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: red;">Error Loading Restaurant Finder</h1>
        <p>Failed to load the application. Please check the console for details.</p>
        <p>Error: ${error}</p>
      </div>
    `;
  }
}

// Start the application when the page loads
main();
