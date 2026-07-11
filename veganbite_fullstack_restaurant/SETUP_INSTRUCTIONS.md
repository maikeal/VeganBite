# Setup Instructions

## 1. Create MongoDB Database

Create a free MongoDB Atlas database and copy your connection string.

## 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

Seed menu data:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

## 3. Frontend

Open `frontend/api-config.js` and make sure it points to:

```javascript
window.API_BASE_URL = "http://localhost:5000";
```

Then open `frontend/index.html` in your browser.

## 4. Deployment Notes

Frontend can be hosted on Netlify.

Backend can be hosted on Render, Railway, or another Node hosting service.

After deploying the backend, update `frontend/api-config.js` with the deployed backend URL.
