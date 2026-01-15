# Scalable Web App - Task Manager

A modern, scalable web application with authentication and dashboard functionality, built with Next.js (frontend) and Node.js/Express (backend).

## Features

### Frontend
- ✅ **React.js/Next.js** - Modern React framework with App Router
- ✅ **TailwindCSS** - Responsive and modern UI design
- ✅ **Form Validation** - Client-side and server-side validation using React Hook Form
- ✅ **Protected Routes** - Authentication-based route protection
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Dashboard** - User profile and task management interface
- ✅ **CRUD Operations** - Full Create, Read, Update, Delete for tasks
- ✅ **Search & Filter** - Advanced filtering and search functionality

### Backend
- ✅ **Node.js/Express** - RESTful API server
- ✅ **MongoDB** - Database with Mongoose ODM
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Input Validation** - express-validator for request validation
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **CORS** - Cross-origin resource sharing enabled

## Tech Stack

### Frontend
- Next.js 16.1.2
- React 19.2.3
- TypeScript
- TailwindCSS 4
- React Hook Form
- Axios
- js-cookie

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS

## Project Structure

```
scalable-web-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── TaskList.tsx
│   │   └── TaskForm.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── types/
│   │   └── index.ts
│   └── package.json
├── API_DOCUMENTATION.md
├── postman_collection.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scalable-web-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```
   Or install separately:
   ```bash
   # Root dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure Backend**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Configure Frontend**
   ```bash
   cd frontend
   cp .env.local.example .env.local
   ```
   Edit `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in `.env`.

6. **Run the application**

   **Option 1: Run both frontend and backend together**
   ```bash
   npm run dev
   ```

   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## Postman Collection

Import `postman_collection.json` into Postman to test all API endpoints. The collection includes:
- Authentication endpoints (Register, Login)
- Profile endpoints (Get, Update)
- Tasks endpoints (CRUD operations)
- Health check endpoint

**Note:** After logging in or registering, the token will be automatically saved to the collection variable `token` for authenticated requests.

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
2. **JWT Authentication**: Secure token-based authentication with 7-day expiration
3. **Input Validation**: Both client-side and server-side validation
4. **CORS**: Configured for secure cross-origin requests
5. **Error Handling**: Comprehensive error handling without exposing sensitive information
6. **Protected Routes**: Frontend routes protected with authentication checks
7. **Token Storage**: Secure cookie-based token storage

## Scalability Considerations

### Frontend-Backend Integration for Production

1. **API Gateway**
   - Implement an API gateway (e.g., Kong, AWS API Gateway) to handle routing, rate limiting, and load balancing
   - Use reverse proxy (Nginx) for static file serving and API routing

2. **State Management**
   - Consider implementing Redux or Zustand for complex state management
   - Use React Query or SWR for efficient data fetching and caching

3. **Code Splitting**
   - Next.js automatically handles code splitting
   - Implement dynamic imports for heavy components
   - Use lazy loading for routes

4. **Caching Strategy**
   - Implement Redis for session management and caching
   - Use CDN for static assets
   - Browser caching for API responses where appropriate

5. **Database Optimization**
   - Implement database indexing (already done for tasks)
   - Use connection pooling
   - Consider read replicas for scaling reads
   - Implement pagination for large datasets

6. **Microservices Architecture**
   - Split services: Auth Service, Task Service, Profile Service
   - Use message queues (RabbitMQ, Kafka) for async operations
   - Implement service discovery

7. **Monitoring & Logging**
   - Implement logging (Winston, Pino)
   - Use APM tools (New Relic, Datadog)
   - Set up error tracking (Sentry)

8. **Deployment**
   - Use containerization (Docker)
   - Orchestration with Kubernetes
   - CI/CD pipelines (GitHub Actions, GitLab CI)
   - Environment-based configuration

9. **Performance**
   - Implement server-side rendering (SSR) and static site generation (SSG) where appropriate
   - Use Next.js Image optimization
   - Implement API response compression
   - Database query optimization

10. **Security Enhancements**
    - Implement rate limiting
    - Add request validation middleware
    - Use HTTPS in production
    - Implement CSRF protection
    - Regular security audits

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. View and update profile
4. Create, read, update, and delete tasks
5. Test search and filter functionality
6. Test protected routes (logout and try accessing dashboard)

### API Testing
Use the provided Postman collection or test with curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## License

This project is created for educational purposes as part of a Frontend Developer Intern assignment.

## Author

Created as part of a Frontend Developer Intern assignment demonstrating:
- Modern frontend development with React/Next.js
- Backend API development with Node.js/Express
- Database integration with MongoDB
- Authentication and security best practices
- Scalable architecture considerations

# Scalable_Web_App
