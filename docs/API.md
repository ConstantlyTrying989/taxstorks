# TaxStorks API Documentation

## Overview
TaxStorks is a platform for sharing anonymous tax advice between users.

## Base URL
```
https://api.taxstorks.com
```

## Authentication
All endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

## Endpoints

### Users

#### POST /users/register
Register a new user anonymously.
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "username": "anonymous_handle"
}
```
**Response:** `201 Created`
```json
{
  "id": "user_123",
  "username": "anonymous_handle",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### POST /users/login
Login and receive an authentication token.
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```
**Response:** `200 OK`
```json
{
  "token": "eyJhbGc...",
  "expires_in": 86400
}
```

### Advice

#### GET /advice
Retrieve anonymous tax advice posts (paginated).
**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 20)
- `category` (string, optional): income, deductions, credits, etc.

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "advice_456",
      "title": "Tax Deduction Question",
      "content": "Can I deduct home office expenses?",
      "category": "deductions",
      "author_id": "anonymous",
      "created_at": "2024-01-15T09:00:00Z",
      "replies_count": 5
    }
  ],
  "total": 150,
  "page": 1
}
```

#### POST /advice
Post new anonymous tax advice.
```json
{
  "title": "Tax Question",
  "content": "Question or advice content",
  "category": "deductions"
}
```
**Response:** `201 Created`
```json
{
  "id": "advice_789",
  "title": "Tax Question",
  "content": "Question or advice content",
  "category": "deductions",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### GET /advice/{id}
Retrieve a specific advice post with replies.
**Response:** `200 OK`
```json
{
  "id": "advice_456",
  "title": "Tax Deduction Question",
  "content": "Can I deduct home office expenses?",
  "category": "deductions",
  "created_at": "2024-01-15T09:00:00Z",
  "replies": [
    {
      "id": "reply_001",
      "content": "Yes, you can if it meets IRS requirements",
      "created_at": "2024-01-15T09:30:00Z"
    }
  ]
}
```

#### DELETE /advice/{id}
Delete an advice post (only by creator).
**Response:** `204 No Content`

### Replies

#### POST /advice/{id}/replies
Reply to an advice post.
```json
{
  "content": "Your reply or advice"
}
```
**Response:** `201 Created`
```json
{
  "id": "reply_123",
  "advice_id": "advice_456",
  "content": "Your reply or advice",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### DELETE /advice/{advice_id}/replies/{reply_id}
Delete a reply (only by creator).
**Response:** `204 No Content`

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting
- 100 requests per hour per user
- 429 Too Many Requests if exceeded

## Privacy & Anonymity
- All user identities are anonymized in responses
- Posts are attributed to randomly generated user IDs
- Email addresses are encrypted and never exposed
- Users can delete their own posts/replies
