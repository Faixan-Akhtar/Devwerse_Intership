# ✈️ Travel Bucket List

A simple Travel Bucket List web application built with **HTML, CSS, JavaScript, Node.js, and Express.js**. Users can add, view, update, and delete their dream travel destinations.

## Features

- Add a new travel destination
- View all destinations
- Edit destination details
- Delete a destination
- Mark a destination as **Visited** or **Not Visited**
- Display different images based on the visit status
- Responsive and user-friendly interface

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js

## Project Structure

```
Travel-Bucket-List/
│
├── server.js
├── package.json
│
└── public/
    ├── index.html
    ├── style.css
    ├── script.js
    └── images/
        ├── visited.jpg
        ├── not-visited.jpg
        └── Travel-banner.jpg
```

## Installation

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Open the project folder.

```bash
cd Travel-Bucket-List
```

3. Install dependencies.

```bash
npm install
```

4. Start the server.

```bash
node server.js
```

5. Open your browser and visit:

```
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/list` | Get all destinations |
| GET | `/list/:id` | Get a destination by ID |
| POST | `/list` | Add a new destination |
| PUT | `/list/:id` | Update a destination |
| DELETE | `/list/:id` | Delete a destination |

## Sample Destination

```json
{
  "country": "Japan",
  "city": "Tokyo",
  "description": "Experience the beautiful cherry blossoms.",
  "verified": false
}
```

## Future Improvements

- Store data in MongoDB or MySQL
- Upload custom destination images
- Search destinations
- Filter by Visited and Not Visited
- User authentication

## Author

**Faizan Akhtar**