# Swagger Javascript Express Node MongoDB

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
- ✅ Comprehensive Logging System
- ✅ Session Management & Login Tracking

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
   
   **Production:**
   ```bash
   npm start
   ```
   
   **Development (with auto-restart):**
   ```bash
   npm run dev
   ```
   
   **Development with debugging:**
   ```bash
   npm run dev:debug
   ```

6. Access Swagger Documentation:
   - Open your browser and go to: `http://localhost:5050/swagger-ui`

7. Monitor Logs:
   - Console logs show real-time server activity
   - Log files are saved in the `logs/` directory
   - Check `logs/combined.log` for all logs
   - Check `logs/error.log` for error logs only

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | User logout | Private |
| GET | `/api/auth/me` | Get current user | Private |

### User Management Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| PUT | `/api/users/profile` | Update own profile | Private |

### Session Management Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/sessions` | Get current user's sessions | Private |
| GET | `/api/users/sessions/all` | Get all sessions with pagination | Admin |
| POST | `/api/users/sessions/logout` | Logout specific session | Private |
| POST | `/api/users/sessions/logout-all` | Logout all user sessions | Private |
| DELETE | `/api/users/sessions/:sessionId` | Terminate session | Admin |

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123",
    "gender": "Male",
    "dob": "10-01-1995"
  }'
```

### Login
```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Logout
```bash
curl -X POST http://localhost:5050/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get current user (with JWT token)
```bash
curl -X GET http://localhost:5050/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update profile
```bash
curl -X PUT http://localhost:5050/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Updated",
    "userName": "johnupdated",
    "phone": "9876543210",
    "gender": "Male",
    "dob": "10-01-1995"
  }'
```

## API Documentation

The API is fully documented with Swagger/OpenAPI 3.0. Once the server is running, you can access the interactive documentation at:

**🔗 [http://localhost:5050/swagger-ui](http://localhost:5050/swagger-ui)**

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

## Logging System

The application includes a comprehensive logging system using Winston:

### **📊 Log Levels:**
- **Error** - System errors and exceptions
- **Warn** - Warning messages and slow requests
- **Info** - General information and server status
- **HTTP** - Request/response logging
- **Debug** - Detailed debugging information (development only)

### **📁 Log Files:**
- `logs/combined.log` - All application logs
- `logs/error.log` - Error logs only
- `logs/application-YYYY-MM-DD.log` - Daily rotated logs

### **🔍 What Gets Logged:**
- **Server Startup** - System info, configuration, database connection
- **Request/Response** - All HTTP requests with timing and status
- **Database Events** - Connection status and errors
- **System Monitoring** - Memory usage every 5 minutes
- **Error Handling** - Detailed error information with stack traces
- **Performance** - Slow request detection (>1000ms)

### **🎨 Console Output:**
- Color-coded log levels
- Emojis for easy visual scanning
- Timestamps for all entries
- Request/response details in development

### **📈 Monitoring Features:**
- Automatic log rotation (daily)
- Memory usage tracking
- Slow request detection
- Error aggregation
- System information logging

## Session Management

The application includes comprehensive session tracking and management:

### **📊 Session Logging Features:**
- **Automatic Login Tracking** - Every login creates a session record
- **Device Information** - Browser, OS, device type detection
- **IP Address Tracking** - Client IP address logging
- **User Agent Parsing** - Detailed client information
- **Session Duration** - Automatic session duration calculation
- **Failed Login Logging** - Track failed login attempts with reasons

### **🔍 Session Data Captured:**
- **User Information** - User ID, email, username
- **Session Details** - Unique session ID, JWT token, expiration
- **Device Info** - Device type (desktop/mobile/tablet), browser, OS
- **Network Info** - IP address, user agent
- **Timing** - Login time, logout time, last activity, duration
- **Status** - Active/inactive, expired, login status (success/failed)

### **🛠️ Session Management:**
- **View Sessions** - Users can view their active sessions
- **Logout Sessions** - Logout specific or all sessions
- **Admin Control** - Admins can view and terminate any session
- **Automatic Cleanup** - Expired sessions are automatically cleaned up
- **Security** - Failed login attempts are logged for security monitoring

### **📈 Session Analytics:**
- **Login Patterns** - Track user login behavior
- **Device Usage** - Monitor device and browser usage
- **Security Monitoring** - Detect suspicious login attempts
- **Session Duration** - Analyze user session patterns

## Development

### **🔄 Nodemon Configuration**

The project uses nodemon for development with the following features:

- **Auto-restart** on file changes
- **Watched directories**: `config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `utils/`
- **File extensions**: `.js`, `.json`
- **Ignored directories**: `node_modules/`, `logs/`, `public/`, `views/`
- **Restart delay**: 1 second
- **Manual restart**: Type `rs` and press Enter

### **📝 Available Scripts**

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Production server |
| `dev` | `npm run dev` | Development with nodemon |
| `dev:debug` | `npm run dev:debug` | Development with debugging enabled |

### **🐛 Debugging**

To debug the application:
1. Run `npm run dev:debug`
2. Open Chrome and go to `chrome://inspect`
3. Click "Open dedicated DevTools for Node"
4. Set breakpoints in your code

## Project Structure

```
├── config/
│   ├── database.js          # MongoDB connection
│   ├── swagger.js           # Swagger configuration
│   └── logger.js            # Winston logging configuration
├── controllers/
│   └── userController.js    # User CRUD operations
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── requestLogger.js    # Request/response logging
├── models/
│   ├── User.js             # User mongoose schema
│   └── Session.js          # Session mongoose schema
├── utils/
│   ├── systemInfo.js       # System information logging
│   └── sessionUtils.js     # Session management utilities
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   └── index.js            # Main routes
├── app.js                  # Express app configuration
├── server.js               # Server startup with logging
├── nodemon.json            # Nodemon configuration
├── test-api.js             # API testing script
├── logs/                   # Log files directory
│   ├── combined.log        # All application logs
│   ├── error.log           # Error logs only
│   └── application-*.log   # Daily rotated logs
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
