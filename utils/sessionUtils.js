const logger = require('../config/logger');

// Parse user agent to extract device information
const parseUserAgent = (userAgent) => {
  if (!userAgent) {
    return {
      type: 'unknown',
      browser: 'unknown',
      os: 'unknown'
    };
  }

  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
  }

  // Detect browser
  let browser = 'unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'Chrome';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('edg')) {
    browser = 'Edge';
  } else if (ua.includes('opera') || ua.includes('opr')) {
    browser = 'Opera';
  } else if (ua.includes('msie') || ua.includes('trident')) {
    browser = 'Internet Explorer';
  }

  // Detect OS
  let os = 'unknown';
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac os') || ua.includes('macos')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  return {
    type: deviceType,
    browser,
    os
  };
};

// Extract IP address from request
const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         req.headers['x-forwarded-for']?.split(',')[0] ||
         'unknown';
};

// Generate session ID
const generateSessionId = () => {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Calculate session expiration time (7 days from now)
const getSessionExpiration = () => {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7); // 7 days
  return expiration;
};

// Create session data object
const createSessionData = (req, user, token, loginStatus = 'success', failureReason = null) => {
  const ipAddress = getClientIP(req);
  const userAgent = req.get('User-Agent') || 'unknown';
  const deviceInfo = parseUserAgent(userAgent);
  
  return {
    user: user._id,
    sessionId: generateSessionId(),
    token,
    ipAddress,
    userAgent,
    deviceInfo,
    location: {
      country: 'unknown', // Could be enhanced with IP geolocation service
      city: 'unknown',
      region: 'unknown'
    },
    loginMethod: 'email', // Default, could be enhanced based on login method
    loginStatus,
    failureReason,
    expiresAt: getSessionExpiration()
  };
};

// Log session creation
const logSessionCreation = (sessionData, user) => {
  logger.info('🔐 New session created:', {
    userId: user._id,
    userName: user.userName,
    email: user.email,
    sessionId: sessionData.sessionId,
    ipAddress: sessionData.ipAddress,
    deviceType: sessionData.deviceInfo.type,
    browser: sessionData.deviceInfo.browser,
    os: sessionData.deviceInfo.os,
    loginStatus: sessionData.loginStatus
  });
};

// Log failed login attempt
const logFailedLogin = (req, email, reason) => {
  const ipAddress = getClientIP(req);
  const userAgent = req.get('User-Agent') || 'unknown';
  
  logger.warn('❌ Failed login attempt:', {
    email,
    ipAddress,
    userAgent,
    reason,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  parseUserAgent,
  getClientIP,
  generateSessionId,
  getSessionExpiration,
  createSessionData,
  logSessionCreation,
  logFailedLogin
};
