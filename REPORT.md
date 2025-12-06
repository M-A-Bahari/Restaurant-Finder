# CS3035 – Project 2 Report

## Description of Your Project

The **Restaurant Finder** is an interactive application inspired by the early 1990s HCI project "HomeFinder." It allows users to discover restaurants in Fredericton by filtering them based on price, rating, restaurant type, and features. The application displays restaurants as markers on an interactive map, with hover and click interactions to view detailed information about each restaurant.

I selected this project because it demonstrates the practical application of MVC architecture in both custom widgets and the main application, showcasing how reusable UI components can be built from scratch. The Restaurant Finder represents a real-world use case where users need to quickly filter and find relevant information from a dataset, making it an excellent demonstration of interactive data visualization and filtering techniques.

---

## Requirements

### How/What different views did you provide for some aspect of your model?

The application provides **multiple coordinated views** for displaying and interacting with restaurant data:

1. **Map View (MapWidget)**
   - Displays all filtered restaurants as circular markers on a geographic map
   - Uses latitude/longitude coordinates to position markers accurately
   - Markers change appearance on hover (larger size, different color)
   - Automatically scales to fit all visible restaurants within the map bounds
   - Updates dynamically when filters are applied

2. **Restaurant Details Panel**
   - Shows comprehensive information about the currently hovered/selected restaurant:
     - Restaurant name (bold, prominent display)
     - Restaurant type (e.g., "Canadian", "Pizza")
     - Average price (displayed with dollar sign)
     - Rating (displayed with star emoji)
     - Features (Parking availability, Pet-friendly status)
     - Description and full address
   - Updates in real-time on hover
   - Displays placeholder text when no restaurant is selected

3. **Filter Panel (Left Sidebar)**
   - **Type Filter**: Radio buttons for restaurant categories (All, Canadian, Indian, Pizza, Burgers, Mexican)
   - **Price Filter**: Two sliders showing minimum and maximum price with dynamic labels
   - **Rating Filter**: Two sliders showing minimum and maximum rating with dynamic labels
   - **Features Filter**: Checkboxes for amenities (Parking, Pets allowed, Vegetarian options, etc.)
   - All filters update dynamically and work in combination

4. **Status Display**
   - Shows "Showing X of Y restaurants" to indicate filtered results
   - Updates automatically when filters change
   - Positioned below the map for easy visibility

All views implement the **MVC pattern** and use the **Subscriber pattern** to automatically update when the model changes, ensuring data consistency across the entire application.

---

### What are the different domain objects that can be created/edited in your application?

The application manages **two primary domain objects**:

1. **Restaurant**
   - **Properties**:
     - `id` (number): Unique identifier
     - `name` (string): Restaurant name
     - `address` (string): Full street address
     - `latitude` (number): Geographic latitude coordinate
     - `longitude` (number): Geographic longitude coordinate
     - `avg_price` (number): Average meal price in dollars
     - `type` (string): Restaurant category (Canadian, Indian, Pizza, Burgers, Mexican)
     - `ratings` (number): User rating (0.0 to 5.0 scale)
     - `features` (string[]): Array of amenities (e.g., "Parking", "Pets allowed", "Vegetarian options")
     - `description` (string): Brief description of the restaurant
   - **Operations**:
     - **View**: Display on map as markers with position based on lat/long
     - **Filter**: Dynamic filtering based on price, rating, type, and features
     - **Hover**: Show brief details in restaurant details panel
     - **Click**: Select for detailed view (future enhancement)
   - **Data Source**: Loaded from `fredericton_restaurants.json` file

2. **FilterState** (Application State Object)
   - **Properties**:
     - `priceMin` (number): Minimum price threshold
     - `priceMax` (number): Maximum price threshold
     - `ratingMin` (number): Minimum rating threshold
     - `ratingMax` (number): Maximum rating threshold
     - `selectedType` (string): Currently selected restaurant type filter
     - `selectedFeatures` (Set<string>): Currently selected feature filters
   - **Operations**:
     - **Update**: Modify filter criteria through UI widgets
     - **Apply**: Filter restaurant list based on current criteria
     - **Reset**: Return to default "show all" state
   - **Logic**: Filters are applied cumulatively (AND logic) - restaurants must match ALL selected criteria

---

### What are the different widgets you created?

I created **three custom widgets** following the MVC pattern:

1. **RadioButton Widget**
   - **Visual Design**: Circle outline with filled inner circle when selected
   - **Properties**:
     - `checked` (boolean): Selection state
     - `text` (string): Label text
     - Customizable colors for fill, border, and text
   - **Behavior**:
     - Toggles state on click
     - Triggers "action" event when clicked
     - Works with RadioButtonGroup for mutual exclusion
   - **MVC Structure**:
     - **Model** (rbmodel.ts): Manages checked state
     - **View** (rbview.ts): Renders circle and label
     - **Controller** (rbcontroller.ts): Handles mouse events
   - **Usage**: Restaurant type selection (All, Canadian, Indian, Pizza, Burgers, Mexican)

2. **RadioButtonGroup Widget**
   - **Purpose**: Manages mutual exclusion for radio button groups
   - **Behavior**:
     - Ensures only one button in group is selected at a time
     - Automatically deselects other buttons when one is selected
   - **API**: `addButton()`, `select()`, `getSelected()`
   - **Usage**: Coordinates the restaurant type radio buttons

3. **Slider Widget**
   - **Visual Design**: Track with draggable thumb
     - Track shows filled portion from start to current value
     - Thumb is a circular handle that can be dragged
   - **Properties**:
     - `value` (number): Current value
     - `min` (number): Minimum value
     - `max` (number): Maximum value
     - Customizable colors for track, fill, and thumb
   - **Behavior**:
     - Drag thumb to adjust value
     - Click on track to jump to value
     - Triggers "action" event on value change
     - Hover effects on thumb
   - **MVC Structure**:
     - **Model** (slidermodel.ts): Manages value, min, max
     - **View** (sliderview.ts): Renders track, fill, and thumb
     - **Controller** (slidercontroller.ts): Handles drag and click events
   - **Usage**: Price filtering (min/max sliders) and Rating filtering (min/max sliders)

**Note on RangeSlider**: While I implemented a placeholder for a RangeSlider widget (two-thumb slider), I opted to use **two separate Slider widgets** (one for min, one for max) to achieve the same functionality. This approach is simpler and more modular, as recommended in the project requirements.

---

### What parts of the application/project did you find particularly challenging? And, what would you have liked to improve?

**Challenging Aspects:**

1. **MapWidget Coordinate System Alignment**
   - The most challenging aspect was fixing the hover detection on the map markers
   - Issue: Mouse event coordinates were in absolute screen space, but marker positions were relative to nested containers
   - The MapWidget is at position (10, 10) inside mapContainer at (320, 70), creating a complex coordinate hierarchy
   - **Solution**: Implemented `absoluteX` and `absoluteY` properties to calculate the widget's absolute position and transform mouse coordinates correctly
   - This required understanding coordinate space transformations and the SimpleKit rendering pipeline

2. **Slider Drag Interaction**
   - Implementing smooth dragging behavior for the slider thumb was complex
   - Needed to track mouse down/move/up states and calculate value based on mouse position
   - Ensuring the thumb stayed within bounds and mapped correctly to the value range
   - Handling edge cases like clicking on the track vs. dragging the thumb

3. **Filter State Management**
   - Coordinating multiple filters (price, rating, type, features) that all affect the same dataset
   - Ensuring the view refreshes correctly when filters change
   - Managing the subscriber pattern to update all views when the model changes
   - Preventing infinite loops when model updates trigger view updates

4. **MVC Architecture for Widgets**
   - Understanding the separation of concerns between Model, View, and Controller
   - The widget MVC is completely separate from the application MVC
   - Managing event propagation and ensuring widgets are reusable in any context

**Improvements for Future Development:**

1. **Click Interaction on Map Markers**
   - Currently only implements hover functionality
   - Could add click to "lock" the selected restaurant and prevent accidental changes
   - Display more detailed information in a modal or expanded panel on click

2. **RangeSlider Implementation (Bonus)**
   - Replace two separate sliders with a single two-thumb RangeSlider widget
   - Would provide better visual feedback showing the selected range
   - More intuitive for users to see and adjust both min and max values together

3. **Distance Filter (Bonus)**
   - Implement the bonus feature to filter restaurants by distance
   - Allow users to select two points on the map and show restaurants within that range
   - Calculate real distances using latitude/longitude coordinates

4. **Visual Enhancements**
   - Add animations for marker hover effects (smooth size transitions)
   - Implement smooth scrolling when restaurant list exceeds panel height
   - Add visual feedback when filters result in zero matches
   - Improve color scheme and typography for better readability

5. **Search Functionality**
   - Add a text search box to filter restaurants by name or description
   - Implement autocomplete suggestions based on restaurant names

6. **Accessibility Improvements**
   - Add keyboard navigation for all widgets
   - Implement ARIA labels for screen reader support
   - Ensure color contrast meets WCAG standards

---

### Any other comments on the project?

This project successfully demonstrates:

- **Custom Widget Development**: Created three reusable widgets (RadioButton, RadioButtonGroup, Slider) with full MVC architecture
- **Interactive Data Visualization**: Implemented an interactive map with hover detection and dynamic marker positioning
- **Complex Filtering Logic**: Combined multiple filter types (range, categorical, feature-based) that work together seamlessly
- **MVC Architecture**: Proper separation of concerns in both the application level and widget level
- **Subscriber Pattern**: Automatic view updates when model changes
- **Coordinate System Management**: Solved complex coordinate transformation issues for accurate hover detection
- **Error Handling**: Added robust error handling for edge cases (empty datasets, division by zero, etc.)

The Restaurant Finder application demonstrates practical UI development skills including custom widget creation, event handling, data filtering, and geographic visualization, all while maintaining clean code architecture and following best practices.

**Key Technical Achievements**:
- Implemented proper coordinate space transformations for nested widgets
- Created reusable, framework-agnostic widgets with clean APIs
- Managed complex state with multiple coordinated views
- Built a responsive, interactive map visualization
- Handled edge cases and error conditions gracefully

This project provided valuable hands-on experience in building interactive user interfaces from scratch, understanding the importance of MVC architecture, and creating reusable components that follow established UI design patterns.
