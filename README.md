# Restaurant Finder

Restaurant Finder is an interactive web application that allows users to discover and explore restaurants in Fredericton using an interactive map and dynamic filters. Users can filter restaurants by price range, rating, cuisine type, and available features, with all views updating in real time.

The project demonstrates practical UI engineering concepts such as custom widget development, the Model–View–Controller (MVC) pattern, coordinated multiple views, and interactive data visualization.

---

## Features

- Interactive map with restaurant markers positioned using latitude and longitude
- Hover interactions to preview restaurant details
- Dynamic filtering by:
  - Price range
  - Rating range
  - Restaurant type
  - Available features (e.g., parking, pet-friendly, vegetarian options)
- Coordinated views that update automatically when filters change
- Custom-built UI widgets implemented from scratch
- Clean separation of concerns using MVC and the subscriber pattern

---

## Technologies Used

- TypeScript / JavaScript
- SimpleKit (UI framework)
- HTML / CSS
- Custom MVC-based widgets

---

## Architecture Overview

The application follows **MVC architecture** at two levels:

### Application MVC
- **Model**: Restaurant data and filter state
- **View**: Map, filter panel, details panel, and status display
- **Controller**: User interactions and event handling

### Widget MVC
Custom widgets are implemented as reusable components, each with its own:
- Model (state)
- View (rendering)
- Controller (input handling)

Widgets created include:
- RadioButton
- RadioButtonGroup
- Slider

This separation ensures modularity, reusability, and maintainability.

---

## Data Source

Restaurant data is loaded from a local JSON file containing:
- Name, address, and description
- Latitude and longitude
- Average price and rating
- Cuisine type
- Feature tags

The data is used solely for demonstration and educational purposes.

---

## Third-Party Libraries

This project uses **SimpleKit**, an external UI framework.

- SimpleKit is **not authored by me**
- It is used under its original license
- No SimpleKit source code is redistributed in this repository

Please refer to the official SimpleKit repository for licensing details and documentation.

---

## Academic Context

This project was originally developed as part of a university course project.

It is shared publicly **for learning and portfolio purposes only**.

> **Academic Integrity Notice**  
> If you are currently enrolled in a similar course, do not copy or submit this code as your own work.

---

## License

This repository contains **original work authored by Md Ataullah Bahari** and is licensed under the **MIT License**.

Third-party libraries (such as SimpleKit) remain under their respective licenses and are not covered by this license.

See the `LICENSE` file for details.

---

## Future Improvements

- Click-to-select interaction for map markers
- Unified range slider widget
- Distance-based filtering
- Text-based search with autocomplete
- Accessibility enhancements (keyboard navigation, ARIA labels)
- UI animations and visual refinements

---

## Author

**Md Ataullah Bahari**  
Computer Science Student  
Academic & Portfolio Project