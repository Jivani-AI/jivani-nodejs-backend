# NodeJS Backend for Jivani

A robust REST API backend built with Node.js, Express, and MongoDB for the Jivani application. This backend handles user management, todos, notes, events, habits, shopping lists, reminders, goals, and transactions.

## Features

- 🔐 User Authentication with JWT
- 📝 CRUD operations for:
  - Notes with blocks (text/checklist)
  - Todo lists with priorities
  - Shopping lists with items
  - Habits with tracking
  - Events with locations
  - Goals with status tracking
  - Reminders with frequencies
  - Financial transactions

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled
- Cookie Parser

## API Routes

### 🔐 User Routes (`/api/v1/users`)
- POST `/register` - Register new user
- POST `/login` - Login user
- POST `/logout` - Logout user
- GET `/current-user` - Get current user
- PUT `/update-account` - Update user details
- POST `/change-password` - Change password

### 📝 Note Routes (`/api/v1/notes`)
- POST `/create` - Create note
- GET `/` - Get all notes
- GET `/:id` - Get note by ID
- PUT `/:id` - Update note
- DELETE `/:id` - Delete note
- PUT `/:id/togglePin` - Toggle note pin
- POST `/:id/block` - Add block
- PUT `/:id/block` - Update block
- DELETE `/:id/block` - Delete block

### 📋 Todo Routes (`/api/v1/todos`)
- POST `/create` - Create todo
- GET `/` - Get all todos
- GET `/:id` - Get todo by ID
- PUT `/:id` - Update todo
- DELETE `/:id` - Delete todo

Similar routes exist for events, goals, reminders, shopping lists, habits, and transactions.

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/Jivani-AI/jivani-nodejs-backend.git
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

4. Start the development server:
```sh
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run format` - Format code using Prettier

## Project Structure

```
src/
├── app.js           # Express app setup
├── index.js         # Entry point
├── constant.js      # Constants
├── controllers/     # Route controllers
├── models/         # Mongoose models
├── routes/         # API routes
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
└── db/            # Database connection
```

## Authentication

The API uses JWT tokens for authentication. Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling

The API uses a custom error handling middleware that returns errors in the following format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [],
  "data": null
}
```