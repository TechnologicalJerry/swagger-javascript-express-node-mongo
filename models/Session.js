const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  logoutTime: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  deviceInfo: {
    type: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown'
    },
    browser: {
      type: String,
      default: 'unknown'
    },
    os: {
      type: String,
      default: 'unknown'
    }
  },
  location: {
    country: {
      type: String,
      default: 'unknown'
    },
    city: {
      type: String,
      default: 'unknown'
    },
    region: {
      type: String,
      default: 'unknown'
    }
  },
  loginMethod: {
    type: String,
    enum: ['email', 'username', 'social'],
    default: 'email'
  },
  loginStatus: {
    type: String,
    enum: ['success', 'failed', 'blocked'],
    default: 'success'
  },
  failureReason: {
    type: String,
    default: null
  },
  sessionDuration: {
    type: Number, // in minutes
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
sessionSchema.index({ user: 1, isActive: 1 });
sessionSchema.index({ sessionId: 1 });
sessionSchema.index({ loginTime: -1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for session duration calculation
sessionSchema.virtual('duration').get(function() {
  if (this.logoutTime) {
    return Math.round((this.logoutTime - this.loginTime) / (1000 * 60)); // in minutes
  }
  return Math.round((Date.now() - this.loginTime) / (1000 * 60)); // in minutes
});

// Method to update last activity
sessionSchema.methods.updateActivity = function() {
  this.lastActivity = Date.now();
  return this.save();
};

// Method to logout session
sessionSchema.methods.logout = function() {
  this.isActive = false;
  this.logoutTime = Date.now();
  this.sessionDuration = this.duration;
  return this.save();
};

// Static method to get active sessions for a user
sessionSchema.statics.getActiveSessions = function(userId) {
  return this.find({ 
    user: userId, 
    isActive: true, 
    isExpired: false,
    expiresAt: { $gt: new Date() }
  }).sort({ loginTime: -1 });
};

// Static method to cleanup expired sessions
sessionSchema.statics.cleanupExpiredSessions = function() {
  return this.updateMany(
    { 
      expiresAt: { $lt: new Date() },
      isActive: true 
    },
    { 
      $set: { 
        isActive: false, 
        isExpired: true,
        logoutTime: new Date()
      } 
    }
  );
};

module.exports = mongoose.model('Session', sessionSchema);
