# Backend Setup

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/scalable-web-app`

**Option 2: MongoDB Atlas (Cloud)**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Replace `MONGODB_URI` with your Atlas connection string

## Running the Backend

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on http://localhost:5000
