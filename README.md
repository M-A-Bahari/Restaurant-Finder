[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-_Xyp6y5)
# Project 2

See the [project description here](https://unbcloud-my.sharepoint.com/:b:/g/personal/scottb_unb_ca/EStmLKfO_bJMqBX_xIJErsYBEHg8P44DIorVHR52Q1wvUA?e=vGXo2d ).

CS 3035 - Building User Interfaces 
Project 2 - RestaurantFinder
Due: December 3, 2025
Read this document completely before getting started.
Goal
The project aims to build a series of custom widgets within a user interface inspired by the 
early 1990s HCI project “HomeFinder.” The objective is to recreate the core functionality of 
HomeFinder, but for restaurants, focusing on implementing widgets like checkboxes, radio 
buttons, and range sliders (or sliders), following the Model-View-Controller (MVC) pattern.
See this video to see the functionality that you will recreate for in the project: 
https://youtu.be/i86-WAStwXw?si=ZqElH3BAtOQa2ZRo&t=27

HomeFinder
Part 1: Building the RestaurantFinder Interface
Create an interactive user interface that replicates the HomeFinder functionality in a 
RestaurantFinder. For part one, you might use simple labels, buttons and text fields to get 
the main functionality completed. In Part 2, you will implement widgets.
1. Data Visualization
• Plot restaurants on a map based on latitude and longitude data. See the map 
example in the examples repo.
• Each restaurant is marked with a clickable marker to display property details.
• Use good interface design principles as discussed in class, to layout the entire 
interface. Including good layout (using CRAP) and following the design heuristics as 
appropriate.
2. Detailed Display on Click
• Hovering over a data point should display the type of food and the restaurant rating, 
something like this: “Canadian – 3.2”
• Clicking on a restaurant marker on the map displays additional details about the 
selected restaurant (i.e., it’s name, type of food, avg. cost, the rating, parking, pets 
allowed).
• Find a good organization to display all info about a restaurant in a clear manner.
3. Widget Integration for Filtering
As mentioned above you might first do the fourth bullet before proceeding to creating 
these widgets. As a temporary step you can get your interface working with placeholder 
widgets that allow you to implement the functionality (e.g., use a text field for choosing the 
min and max cost and rating).
When you are ready you can integrate the widgets as follows (see Part 2 for a list of widget 
features):
• Range Sliders or simple sliders for avg. cost and rating.
• Radio Buttons for restaurant type (e.g., Canadian, Indian, Pizza, Burgers, Mexican).
• Checkboxes for various restaurant features (e.g., free parking, pets allowed, 
vegetarian options, etc.).
• Use text labels for clarity and to display current values of range sliders.
4. MVC Structure
• Implement RestaurantFinder following the MVC design pattern, remembering that 
this is independent from the widget MVC structure that you will do in Part 2.

Part 2: Widget Creation
You will build two custom widgets by extending the SimpleKit framework, making each 
widget functional and reusable, just like standard components such as buttons or text 
labels.
1. RadioButton
• Represents a boolean value (on/off).
• RadioButton should be a circle outline, with a darker circle interior. Colors are 
settable with the API.
• When clicked, toggles state and triggers an action event for subscribers.
• Accessible via getter/setter methods.
• Functions similarly to a checkbox but ensures only one button in a group is checked 
at a time.
• Implement an additional RadioButtonGroup class to manage groups.
• When one button in a group is selected, others are automatically deselected.
2. RangeSlider or Slider
• Allows selection of a range within a larger set, useful for parameters like average 
price or ratings. You can achieve this in one of two ways, by creating a RangeSlider 
widget or a Slider widget. In the case of the simpler slider widget, you would need to 
use two sliders, one for the max value and one for the value.
• Update from the original post: to simplify this part, we can create a range in the 
interface using two slider widgets (one for maximum and one for minimum values) 
to define the extent of the widgets. Choosing the option to make a simple slider will 
not sacrifice points. However, if you choose to create a double slider you can get a 
bonus of up to 3%.
• Contains minimum and maximum “thumbs” to define the selected range. Or, just 
one thumb in the case of a slider. 
• Action events are triggered upon adjusting either thumb.
• Instantiated with min/max values and width.
3. MVC Structure
• Use MVC for each of your widgets. Each should have a simple model. See the 
Checkbox and MapWidget examples.
4. Video Demo
• a video demonstration of your app (no longer than 3 mins long; if it's shorter, that's 
fine). The video can be narrated, but it should demonstrate all the main 
functionalities of your app. It is also a chance for you to explain parts that are 
incomplete. Upload your videos to D2L.
Grading Scheme (tentative):
• RadioButton Widget - 10% (building from the CheckBox example)
• Range Slider or Slider Widget – 30%
• RestaurantFinder Interface - 30%
• Overall Quality (visual design, implementation design, and effort) - 25%
• Completed REPORT.md and AI Disclosure - 2%
• Video Demo of the System - 3%
Bonus Opportunity (up to 6%):
For a bonus of up to 3%, implement a distance filter to allow users to select restaurants
within a specified range between two points on the map. Calculate real distances based 
on lat/long values, allowing users to filter properties by proximity.
For the other bonus of 3% complete the DoubleSlider as described above.
Implementation Recommendation/Advice:
The map-example in the examples repo will be extremely helpful. You can use it for the 
map portion of your RestaurantFinder. It also demonstrates how you can use MVC with 
widgets.
Begin by developing the main Finder interface (i.e., Part 1) and setting up property display 
and completing the main interface layout.
Initially, use text fields as placeholders for widgets, allowing you to develop the primary 
interface while adding the custom widgets later for filtering functionality as they are 
implemented. This also allow you to complete the project, without implementing all of the 
widgets.
MVC is part of this project, to help you understand how it can be effectively implemented. 
However, you may wish to start by implementing parts of your project in a single set of files 
and then refactoring to better use MVC. However, it is recommended that you refactor as 
you go (e.g., implement one widget completely and refactor it, before moving on to the 
next), since refactoring your code can take a bit of time. Also, you should find that once you 
implement a couple of the parts of the project using MVC, it will be easier to implement the 
future parts using it.
Remember the MVC in your widgets will be totally separate from the MVC in your 
application. Your RestaurantFinder application will use the widgets, but just like you can 
use buttons and labels in SimpleKit, your application does not need to know how the 
widgets are implemented (i.e., your widgets could be used in any application).
Files have been provided to provide a recommended structure. However, these can be 
changed as appropriate based on your approach.
Think about the time and effort that you want to dedicate to it and how you can dedicate 
time to it. It is expected that this project will take some time, so starting early is a good 
idea