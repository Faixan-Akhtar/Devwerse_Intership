# Interactive Profile Cards

A simple interactive web application built with **HTML, CSS, and JavaScript** that displays three profile cards. Each card contains a user's name, role, and a **"Greet Me"** button. Clicking the button dynamically generates a personalized greeting and keeps track of how many times that specific card's button has been clicked.

## Features

- Three responsive profile cards
- Personalized greeting generated using **template literals**
- Individual click counter for each profile card
- Event handling with `addEventListener()`
- DOM manipulation using `querySelector()`
- Uses an **arrow function** to format greeting messages
- Clean card design with hover effects and shadows

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

## Project Structure

```
Interactive-Profile-Cards/
│── index.html
│── style.css
│── script.js
│── avatar_1.png
│── avatar_2.png
│── avatar_3.png
└── README.md
```

## How It Works

1. Open the webpage.
2. Three profile cards are displayed.
3. Click the **"Greet Me"** button on any card.
4. A personalized greeting appears below the selected card.
5. The click counter updates only for the clicked card.

Example greeting:

```
Hello, my name is Katherine Lee and I am a Web Developer!
```

Example counter:

```
Clicked 3 times
```

## JavaScript Concepts Used

- Arrow Functions
- Template Literals
- `addEventListener()`
- DOM Selection (`querySelector`, `querySelectorAll`)
- Event Handling
- Dynamic Content Updates
- Click Counter Logic

## UI Features

- Modern card layout
- Rounded corners
- Box shadow effect
- Button hover animation
- Card hover lift effect
- Responsive flexbox layout

## Learning Objectives

This project demonstrates how to:

- Create interactive profile cards.
- Handle button click events.
- Update HTML elements dynamically.
- Generate text using template literals.
- Use arrow functions for reusable code.
- Maintain separate click counts for different elements.
- Build a clean UI using CSS Flexbox.

## Future Improvements

- Replace placeholder avatars with real profile images.
- Add more profile cards dynamically.
- Store click counts using Local Storage.
- Add animations when greetings appear.
- Make the layout fully mobile responsive.

## Author

Created as a JavaScript DOM Manipulation practice project.