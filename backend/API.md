# API Documentation

This document provides an overview of all available API endpoints for frontend integration.

## Base URL
```
http://localhost:8000
```

## Authentication

The API supports two modes:
1. **Authenticated**: Include `Authorization: Bearer <token>` header
2. **Anonymous**: No authentication required (uses cookies for session management)

## Endpoints

### Health Check
- **GET** `/`
  - Returns: `{"status": "online"}`

### Authentication Endpoints (`/api/auth`)

#### Sign Up
- **POST** `/api/auth/signup`
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Returns:**
    ```json
    {
      "user": { ... },
      "session": {
        "access_token": "...",
        ...
      }
    }
    ```

#### Login
- **POST** `/api/auth/login`
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Returns:**
    ```json
    {
      "user": { ... },
      "session": {
        "access_token": "...",
        ...
      }
    }
    ```

#### Logout
- **POST** `/api/auth/logout`
  - **Requires:** Authentication
  - **Returns:**
    ```json
    {
      "success": true
    }
    ```

#### Get Current User
- **GET** `/api/auth/me`
  - **Requires:** Authentication
  - **Returns:**
    ```json
    {
      "user": { ... }
    }
    ```

### Chat Endpoints (`/api/chat`)

#### Send Message
- **POST** `/api/chat`
  - **Works with or without authentication**
  - **Body:**
    ```json
    {
      "message": "What insurance is required for filming in St. Louis?"
    }
    ```
  - **Headers:** 
    - Optional: `Authorization: Bearer <token>` (if authenticated)
    - Required: `Content-Type: application/json`
  - **Cookies:** 
    - For anonymous users, a cookie `anonymous_session_id` is automatically set
  - **Returns:** Chatbot response from n8n webhook

#### Get Chat History
- **GET** `/api/chat/history`
  - **Works with or without authentication**
  - **Headers:** 
    - Optional: `Authorization: Bearer <token>` (if authenticated)
  - **Cookies:** 
    - For anonymous users, include the `anonymous_session_id` cookie
  - **Returns:**
    ```json
    {
      "messages": [
        {
          "id": 1,
          "session_id": "uuid-or-user-id",
          "message": {
            "type": "human" | "ai",
            "content": "Message content...",
            "additional_kwargs": {},
            "response_metadata": {}
          }
        }
      ]
    }
    ```

#### Get Recent Messages (All Users)
- **GET** `/api/chat/recent`
  - **No authentication required**
  - **Returns:** The most recent 20 messages from all users
  - **Returns:**
    ```json
    {
      "messages": [
        {
          "type": "human",
          "content": "Message content..."
        },
        {
          "type": "ai",
          "content": "Response content..."
        }
      ]
    }
    ```
  - **Note:** 
    - Messages are ordered chronologically (oldest of the 20 most recent first)
    - Each message only contains `type` ("human" or "ai") and `content` (message text)

## Frontend Integration Examples

### Anonymous Chat (No Authentication)

```typescript
// Send a message
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important: to send/receive cookies
  body: JSON.stringify({
    message: "What insurance is required for filming in St. Louis?"
  })
});

const data = await response.json();

// Get chat history
const historyResponse = await fetch('http://localhost:8000/api/chat/history', {
  credentials: 'include' // Include cookies
});

const history = await historyResponse.json();
```

### Authenticated Chat

```typescript
// Send a message
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    message: "What insurance is required for filming in St. Louis?"
  })
});

const data = await response.json();
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Main FastAPI app
│   ├── config.py            # Configuration
│   ├── models.py            # Pydantic models
│   ├── dependencies.py      # Auth dependencies
│   ├── utils.py             # Utility functions
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Authentication routes
│       └── chat.py           # Chat routes
├── main.py                  # Entry point (runs app.main)
└── API.md                   # This file
```

## Notes

- All endpoints return JSON
- Error responses follow the format: `{"detail": "error message"}`
- Anonymous sessions are maintained via cookies (30-day expiration)
- Chat history is ordered by ID (oldest first)

