const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123'
};

async function testAPI() {
  try {
    console.log('🚀 Starting API Tests...\n');

    // Test 1: Register user
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ Registration successful:', registerResponse.data.message);
    const userToken = registerResponse.data.data.token;

    // Test 2: Login user
    console.log('\n2. Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful:', loginResponse.data.message);

    // Test 3: Get current user
    console.log('\n3. Testing get current user...');
    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Get current user successful:', meResponse.data.data.name);

    // Test 4: Update profile
    console.log('\n4. Testing update profile...');
    const updateProfileResponse = await axios.put(`${BASE_URL}/users/profile`, {
      name: 'Updated Test User'
    }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Profile update successful:', updateProfileResponse.data.message);

    // Test 5: Register admin user
    console.log('\n5. Testing admin registration...');
    const adminRegisterResponse = await axios.post(`${BASE_URL}/auth/register`, adminUser);
    console.log('✅ Admin registration successful');

    // Update admin role manually in database (this would normally be done by an existing admin)
    console.log('\n⚠️  Note: Admin role needs to be set manually in database for full testing');

    console.log('\n🎉 All basic tests completed successfully!');
    console.log('\n📋 Available endpoints:');
    console.log('POST /api/auth/register - Register new user');
    console.log('POST /api/auth/login - Login user');
    console.log('GET /api/auth/me - Get current user');
    console.log('PUT /api/users/profile - Update user profile');
    console.log('GET /api/users - Get all users (Admin only)');
    console.log('GET /api/users/:id - Get user by ID (Admin only)');
    console.log('PUT /api/users/:id - Update user (Admin only)');
    console.log('DELETE /api/users/:id - Delete user (Admin only)');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
