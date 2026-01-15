# Scalable Web App - Task Manager

A modern **frontend-only** web application with authentication and dashboard functionality, built with Next.js.  
**Backend has been removed**; auth + tasks are stored in the browser via `localStorage`.

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

### Data/Auth (Frontend-only)
- ✅ **Local auth** - Register/login stored in `localStorage`
- ✅ **Local CRUD** - Tasks stored in `localStorage`

## Tech Stack

### Frontend
- Next.js 16.1.2
- React 19.2.3
- TypeScript
- TailwindCSS 4
- React Hook Form
- Browser `localStorage`

## Project Structure

```
scalable-web-app/
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
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scalable-web-app
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the application**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000

## Data persistence

This app stores data in your browser:
- Users: `localStorage` key `swa_users`
- Current user: `localStorage` key `swa_current_user_id`
- Token: `localStorage` key `swa_token`
- Tasks: `localStorage` key `swa_tasks`

## Security note

Since this is **frontend-only**, it is **not secure for production** (client storage can be tampered with).  
For real security you need a backend + proper password hashing/JWT on the server.

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

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

### Building for Production
```bash
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

### Reset local data

To reset the app, clear site data in the browser or delete these keys in DevTools → Application → Local Storage:
`swa_users`, `swa_current_user_id`, `swa_token`, `swa_tasks`

## License

This project is created for educational purposes as part of a Frontend Developer Intern assignment.

## Author

Created as part of a Frontend Developer Intern assignment demonstrating:
- Modern frontend development with React/Next.js
- Scalable architecture considerations

# Scalable_Web_App
