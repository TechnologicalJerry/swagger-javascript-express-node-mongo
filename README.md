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
- ✅ Swagger API Documentation

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
   MONGODB_URI=mongodb://localhost:27017/swagger-javascript-express-node-mongo
   
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

6. Access Swagger Documentation:
   - Open your browser and go to: `http://localhost:3000/api-docs`

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

## API Documentation

The API is fully documented with Swagger/OpenAPI 3.0. Once the server is running, you can access the interactive documentation at:

**🔗 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

The Swagger UI provides:
- Interactive API testing
- Request/response examples
- Authentication testing with JWT tokens
- Schema definitions
- Error response documentation

## Testing

### Option 1: Automated Test Script
Run the test script to verify the API:
```bash
node test-api.js
```

### Option 2: Postman Collection
Import the comprehensive Postman collection for interactive testing:

1. **Import Collection:**
   - Open Postman
   - Import `postman/User-CRUD-API.postman_collection.json`
   - Import `postman/User-CRUD-API.postman_environment.json`

2. **Select Environment:**
   - Choose "User CRUD API - Development" environment

3. **Start Testing:**
   - Use the "Authentication" folder to register/login
   - JWT tokens are automatically saved and used
   - Test all endpoints with pre-configured requests

**📁 Postman Files:**
- `postman/User-CRUD-API.postman_collection.json` - Complete API collection
- `postman/User-CRUD-API.postman_environment.json` - Environment variables
- `postman/README.md` - Detailed Postman setup guide

**🎯 Postman Features:**
- Automatic JWT token management
- Pre-configured test scenarios
- Error handling tests
- Admin endpoint testing
- Response validation

## Project Structure

```
├── config/
│   ├── database.js          # MongoDB connection
│   └── swagger.js           # Swagger configuration
├── controllers/
│   └── userController.js    # User CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User mongoose schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   └── index.js            # Main routes
├── app.js                  # Express app configuration
├── server.js               # Server startup
├── test-api.js             # API testing script
├── postman/                # Postman collection files
│   ├── User-CRUD-API.postman_collection.json
│   ├── User-CRUD-API.postman_environment.json
│   └── README.md
└── README.md               # Documentation
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
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/swagger-javascript-express-node-mongo |
| JWT_SECRET | JWT secret key | your-super-secret-jwt-key |
| JWT_EXPIRE | JWT expiration time | 7d |
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |

## License

MIT
