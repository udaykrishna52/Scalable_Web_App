# Quick Start Guide

## Prerequisites Check
- [ ] Node.js (v18+) installed
- [ ] MongoDB installed and running (or MongoDB Atlas account)

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Configure Backend
```bash
cd backend
# Copy the example env file
# On Windows PowerShell:
Copy-Item .env.example .env
# On Linux/Mac:
# cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
JWT_SECRET=change-this-to-a-random-secret-key
NODE_ENV=development
```

### Step 3: Configure Frontend
```bash
cd frontend
# Create .env.local file
# On Windows PowerShell:
Copy-Item .env.local.example .env.local
# On Linux/Mac:
# cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 4: Start MongoDB
- **Local MongoDB**: Make sure MongoDB service is running
- **MongoDB Atlas**: Your connection string should be in `.env`

### Step 5: Run the Application
```bash
# From root directory
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000).

### Step 6: Access the Application
- Open http://localhost:3000 in your browser
- Register a new account
- Start using the dashboard!

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongosh` or check MongoDB service status
- Verify `MONGODB_URI` in `backend/.env`
- For Atlas: Check network access and connection string

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Change port in `frontend/package.json` scripts

### Module Not Found Errors
- Run `npm install` in both `backend` and `frontend` directories
- Delete `node_modules` and reinstall if needed

### CORS Errors
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

## Testing the API

### Using Postman
1. Import `postman_collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:5000/api`
3. Start with "Register" or "Login" request
4. Token will be automatically saved for authenticated requests

### Using curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login (save the token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Tasks (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## Next Steps
- Read [README.md](./README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
- Review scalability notes in README for production considerations
