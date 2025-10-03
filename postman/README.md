# Postman Collection for User CRUD API

This directory contains a comprehensive Postman collection for testing the User CRUD API with JWT authentication.

## 📁 Files Included

- `User-CRUD-API.postman_collection.json` - Complete API collection
- `User-CRUD-API.postman_environment.json` - Environment variables
- `README.md` - This setup guide

## 🚀 Quick Setup

### 1. Import Collection and Environment

1. **Open Postman**
2. **Import Collection:**
   - Click "Import" button
   - Select `User-CRUD-API.postman_collection.json`
   - Click "Import"

3. **Import Environment:**
   - Click "Import" button
   - Select `User-CRUD-API.postman_environment.json`
   - Click "Import"

4. **Select Environment:**
   - In the top-right corner, select "User CRUD API - Development" environment

### 2. Start Your API Server

Make sure your API server is running:
```bash
npm start
```

The server should be running on `http://localhost:3000`

## 📋 Collection Structure

### 🔐 Authentication
- **Register User** - Create a new user account
- **Login User** - Authenticate with existing credentials
- **Get Current User Profile** - Retrieve authenticated user's profile

### 👥 User Management
- **Get All Users (Admin)** - List all users (admin only)
- **Get User by ID (Admin)** - Get specific user details (admin only)
- **Update User by ID (Admin)** - Update any user (admin only)
- **Delete User by ID (Admin)** - Delete a user (admin only)
- **Update Own Profile** - Update current user's profile

### 🧪 Test Scenarios
- **Complete User Flow Test** - End-to-end user journey
- **Error Handling Tests** - Test various error scenarios

## 🔧 Environment Variables

The collection uses these environment variables:

| Variable | Description | Auto-Set |
|----------|-------------|----------|
| `base_url` | API server URL | No |
| `auth_token` | JWT token for authentication | Yes |
| `user_id` | Current user ID | Yes |
| `test_auth_token` | Test user token | Yes |
| `test_user_id` | Test user ID | Yes |

## 🎯 How to Use

### Basic Flow

1. **Register or Login:**
   - Use "Register User" or "Login User" request
   - The JWT token will be automatically saved to `auth_token` variable

2. **Access Protected Endpoints:**
   - All protected endpoints use the saved token automatically
   - No need to manually copy/paste tokens

3. **Test Admin Functions:**
   - First, create a user and manually set their role to "admin" in the database
   - Or use an existing admin account

### Test Scenarios

The collection includes pre-configured test scenarios:

1. **Complete User Flow Test:**
   - Registers a test user
   - Logs them in
   - Gets their profile
   - Updates their profile

2. **Error Handling Tests:**
   - Tests invalid credentials
   - Tests unauthorized access
   - Tests admin-only endpoints with regular user

## 🔍 Features

### Automatic Token Management
- JWT tokens are automatically extracted and saved after login/register
- All protected requests use the saved token automatically
- No manual token management required

### Pre-request Scripts
- Global pre-request script logs all requests
- Individual scripts handle token extraction

### Test Scripts
- Global tests check response time and structure
- Individual tests validate specific responses
- Automatic token saving for authenticated requests

### Error Testing
- Comprehensive error scenario testing
- Validates proper error responses
- Tests authorization and authentication

## 📊 Response Validation

The collection includes automatic validation for:
- Response time (< 5000ms)
- Response structure (success property)
- HTTP status codes
- Error message formats

## 🛠️ Customization

### Adding New Requests
1. Create new request in appropriate folder
2. Use `{{base_url}}` for the base URL
3. Use `{{auth_token}}` for authentication
4. Add test scripts as needed

### Modifying Environment
1. Edit the environment variables in Postman
2. Update the JSON file if needed
3. Re-import if changes are made to the file

### Adding Tests
1. Use the "Tests" tab in Postman
2. Add JavaScript validation code
3. Use `pm.test()` for assertions
4. Use `pm.expect()` for expectations

## 🚨 Troubleshooting

### Common Issues

1. **"Invalid token" errors:**
   - Make sure you've logged in first
   - Check that the token is saved in environment variables
   - Verify the token hasn't expired

2. **"Admin access required" errors:**
   - Make sure you're using an admin account
   - Check user role in database
   - Create admin user manually if needed

3. **Connection errors:**
   - Verify the API server is running
   - Check the `base_url` environment variable
   - Ensure MongoDB is running

### Database Setup for Admin Testing

To test admin endpoints, you need an admin user:

1. **Register a regular user first**
2. **Update the user's role in MongoDB:**
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. **Login with that user to get admin token**

## 📝 Example Usage

### 1. Register and Login
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Access Protected Route
```
GET /api/auth/me
Authorization: Bearer <auto-saved-token>
```

### 3. Admin Operations
```
GET /api/users
Authorization: Bearer <admin-token>
```

## 🔗 Related Resources

- [API Documentation (Swagger)](http://localhost:3000/api-docs)
- [Main README](../README.md)
- [Postman Documentation](https://learning.postman.com/docs/)

## 📞 Support

If you encounter any issues:
1. Check the API server logs
2. Verify MongoDB connection
3. Check environment variables
4. Review the Swagger documentation
