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


## Data Persistence

- Menu data is stored in MongoDB.
- Cart data is stored in MongoDB by session ID.
- Order data is stored in MongoDB.
- When a customer updates the cart, the cart state is saved to the backend.
- When a customer places an order, the order is saved to MongoDB and the cart is cleared.

## Purpose

This project was created to extend the restaurant website by adding a backend using Node.js, Express, and MongoDB. The backend supports core restaurant application features including menu display, cart updates, order processing, and database persistence.

## Live Website

Frontend hosted link here:

```text
https://your-netlify-link.netlify.app
```

## Backend API

Deployed backend link here:

```text
https://your-backend-link.onrender.com
```

## GitHub Repository

Previous Restaurant GitHub repositories:

```text
https://github.com/maikeal/veganbite_Project-1
```
```text
https://github.com/maikeal/veganbite_Project-2
```

## Author

Michael Ilobi
