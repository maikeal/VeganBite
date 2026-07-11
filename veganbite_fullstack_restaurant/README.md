# VeganBite Full-Stack Restaurant Website

VeganBite is a full-stack vegan restaurant web application. This project extends the Homework 2 React restaurant website by adding a complete backend built with Node.js, Express, and MongoDB.

## Project Description

The original restaurant website has been extended so important restaurant data is no longer stored only in the frontend. Menu items are retrieved from a MongoDB database through REST API endpoints. Cart updates are saved to the database by session ID, and customer orders are stored in MongoDB when an order is placed.

The application includes a responsive restaurant frontend and a backend API that supports menu management, cart persistence, and order processing.

## Features

### Frontend

- Responsive restaurant website
- VeganBite landing page
- Menu section loaded from backend API
- Menu category filters
- Shopping cart
- Cart quantity updates
- Remove items from cart
- Clear cart
- Checkout/order submission
- Gallery slider
- About section
- Contact section with Google Map
- Responsive design for desktop, tablet, and mobile

### Backend

- Node.js and Express REST API
- MongoDB database connection with Mongoose
- Menu item collection
- Cart collection
- Order collection
- API route for retrieving menu items
- API route for saving cart updates
- API route for clearing carts
- API route for placing orders
- API route for viewing orders
- API routes for adding, updating, and removing menu items
- Seed script for adding starter menu data to MongoDB

## Technologies Used

- React
- Bootstrap
- HTML
- CSS
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Folder Structure

```text
veganbite_fullstack_restaurant/
├── backend/
│   ├── config/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── README.md
│   └── server.js
└── frontend/
    ├── assets/
    ├── src/
    ├── vendor/
    ├── api-config.js
    ├── index.html
    ├── script.js
    ├── styles.css
    └── README.md
```

## API Endpoints

### Menu Management

```text
GET    /api/menu
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id
```

### Cart Persistence

```text
GET    /api/cart/:sessionId
PUT    /api/cart/:sessionId
DELETE /api/cart/:sessionId
```

### Order Processing

```text
GET    /api/orders
POST   /api/orders
PATCH  /api/orders/:id/status
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

Seed the MongoDB menu collection:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## Frontend Setup

Open `frontend/api-config.js`. For local development, keep:

```javascript
window.API_BASE_URL = "http://localhost:5000";
```

If you deploy the backend, update that URL with the deployed backend link.

## Data Persistence

- Menu data is stored in MongoDB.
- Cart data is stored in MongoDB by session ID.
- Order data is stored in MongoDB.
- When a customer updates the cart, the cart state is saved to the backend.
- When a customer places an order, the order is saved to MongoDB and the cart is cleared.

## Purpose

This project was created to extend the Homework 2 restaurant website by adding a backend using Node.js, Express, and MongoDB. The backend supports core restaurant application features including menu display, cart updates, order processing, and database persistence.

## Live Website

Add your frontend hosted link here:

```text
https://your-netlify-link.netlify.app
```

## Backend API

Add your deployed backend link here:

```text
https://your-backend-link.onrender.com
```

## GitHub Repository

Add your GitHub repository link here:

```text
https://github.com/your-username/veganbite-fullstack-restaurant
```

## Author

Your Name
