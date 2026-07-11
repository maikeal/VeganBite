# VeganBite Backend API

This backend extends the VeganBite restaurant website with Node.js, Express, and MongoDB.

## Features

- Menu items stored in MongoDB
- React frontend fetches menu items from the API
- Cart updates saved by session ID
- Orders saved to MongoDB when customers checkout
- Menu items can be created, updated, or removed through REST API endpoints

## API Endpoints

```text
GET    /api/menu
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id

GET    /api/cart/:sessionId
PUT    /api/cart/:sessionId
DELETE /api/cart/:sessionId

GET    /api/orders
POST   /api/orders
PATCH  /api/orders/:id/status
```

## Setup

```bash
npm install
npm run seed
npm run dev
```
