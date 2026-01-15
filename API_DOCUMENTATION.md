# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "bio": "",
      "avatar": ""
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email"
    }
  ]
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "bio": "",
      "avatar": ""
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Profile Endpoints

### Get User Profile
**GET** `/profile`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "bio": "Software developer",
      "avatar": ""
    },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Update User Profile
**PUT** `/profile`

Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "profile": {
    "bio": "Updated bio",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john@example.com",
    "profile": {
      "bio": "Updated bio",
      "avatar": "https://example.com/avatar.jpg"
    },
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## Tasks Endpoints

### Get All Tasks
**GET** `/tasks`

Get all tasks for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description

**Example:**
```
GET /tasks?status=completed&priority=high&search=important
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the web app",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Task
**GET** `/tasks/:id`

Get a single task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the web app",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-01-20T00:00:00.000Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Update Task
**PUT** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Task",
  "status": "completed",
  "priority": "high"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Updated Task",
    "description": "Task description",
    "status": "completed",
    "priority": "high",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Health Check

### Health Check
**GET** `/health`

Check if the server is running.

**Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "fieldName"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error
