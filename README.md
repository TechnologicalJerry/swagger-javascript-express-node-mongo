# User CRUD API with JWT Authentication

A complete Node.js/Express API with user CRUD operations, JWT authentication, and MongoDB integration.

## Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing with bcrypt
- ✅ User CRUD Operations
- ✅ Role-based Access Control
- ✅ Profile Management
- ✅ MongoDB Integration
- ✅ CORS Support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/swagger-app
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Server
   PORT=3000
   NODE_ENV=development
   ```

4. Start MongoDB (if running locally)

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### User Management Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| PUT | `/api/users/profile` | Update own profile | Private |

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get current user (with JWT token)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update profile
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated"
  }'
```

## Testing

Run the test script to verify the API:
```bash
node test-api.js
```

## Project Structure

```
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── userController.js    # User CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User mongoose schema
├── routes/
│   ├── auth.js             # Authentication routes
│   └── users.js            # User management routes
├── app.js                  # Express app configuration
├── server.js               # Server startup
└── test-api.js             # API testing script
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- CORS protection
- Environment variable configuration

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/swagger-app |
| JWT_SECRET | JWT secret key | your-super-secret-jwt-key |
| JWT_EXPIRE | JWT expiration time | 7d |
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |

## License

MIT
