const User = require('../models/User');
const Session = require('../models/Session');
const { generateToken } = require('../middleware/auth');
const { createSessionData, logSessionCreation, logFailedLogin } = require('../utils/sessionUtils');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, password, gender, dob } = req.body;

    // Check if user already exists with email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ userName });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
      gender,
      dob
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // Log failed login attempt
      logFailedLogin(req, email, 'User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      // Log failed login attempt
      logFailedLogin(req, email, 'Account deactivated');
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // Log failed login attempt
      logFailedLogin(req, email, 'Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Create session data
    const sessionData = createSessionData(req, user, token, 'success');
    
    // Save session to database
    try {
      const session = await Session.create(sessionData);
      logSessionCreation(sessionData, user);
    } catch (sessionError) {
      console.error('Session creation error:', sessionError);
      // Continue with login even if session logging fails
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob,
          role: user.role,
          isActive: user.isActive
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, gender, dob, role, isActive } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) {
      // Check if username is already taken by another user
      const existingUserByUsername = await User.findOne({ userName, _id: { $ne: req.params.id } });
      if (existingUserByUsername) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      user.userName = userName;
    }
    if (email) {
      // Check if email is already taken by another user
      const existingUserByEmail = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUserByEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken'
        });
      }
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, gender, dob } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) {
      // Check if username is already taken by another user
      const existingUserByUsername = await User.findOne({ userName, _id: { $ne: req.user.id } });
      if (existingUserByUsername) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }
      user.userName = userName;
    }
    if (email) {
      // Check if email is already taken by another user
      const existingUserByEmail = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUserByEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken'
        });
      }
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user sessions
// @route   GET /api/users/sessions
// @access  Private
const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.getActiveSessions(req.user.id);
    
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    console.error('Get user sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all sessions (Admin)
// @route   GET /api/users/sessions/all
// @access  Private/Admin
const getAllSessions = async (req, res) => {
  try {
    const { page = 1, limit = 10, userId, isActive } = req.query;
    
    // Build filter
    const filter = {};
    if (userId) filter.user = userId;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const sessions = await Session.find(filter)
      .populate('user', 'firstName lastName userName email')
      .sort({ loginTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Session.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: sessions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: sessions
    });
  } catch (error) {
    console.error('Get all sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Logout session
// @route   POST /api/users/sessions/logout
// @access  Private
const logoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    const session = await Session.findOne({ 
      sessionId, 
      user: req.user.id,
      isActive: true 
    });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or already logged out'
      });
    }
    
    await session.logout();
    
    res.status(200).json({
      success: true,
      message: 'Session logged out successfully'
    });
  } catch (error) {
    console.error('Logout session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Logout all sessions
// @route   POST /api/users/sessions/logout-all
// @access  Private
const logoutAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ 
      user: req.user.id,
      isActive: true 
    });
    
    for (const session of sessions) {
      await session.logout();
    }
    
    res.status(200).json({
      success: true,
      message: `Logged out ${sessions.length} sessions successfully`
    });
  } catch (error) {
    console.error('Logout all sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Terminate session (Admin)
// @route   DELETE /api/users/sessions/:sessionId
// @access  Private/Admin
const terminateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await Session.findOne({ 
      sessionId,
      isActive: true 
    });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or already terminated'
      });
    }
    
    await session.logout();
    
    res.status(200).json({
      success: true,
      message: 'Session terminated successfully'
    });
  } catch (error) {
    console.error('Terminate session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    User logout
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    // Find and logout the current session
    const session = await Session.findOne({ 
      token,
      user: req.user.id,
      isActive: true 
    });
    
    if (session) {
      await session.logout();
      
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } else {
      // Session not found, but still return success as user might be using an old token
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  getUserSessions,
  getAllSessions,
  logoutSession,
  logoutAllSessions,
  terminateSession
};
