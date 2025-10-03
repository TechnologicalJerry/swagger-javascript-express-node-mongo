const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser, 
  updateProfile 
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), getUsers);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), getUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteUser);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

module.exports = router;