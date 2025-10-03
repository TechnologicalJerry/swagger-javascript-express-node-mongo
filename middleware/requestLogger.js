const logger = require('../config/logger');

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request details
  logger.http(`📥 ${req.method} ${req.originalUrl} - ${req.ip}`);
  
  // Log request headers (in development)
  if (process.env.NODE_ENV === 'development') {
    logger.debug('📋 Request Headers:', {
      'User-Agent': req.get('User-Agent'),
      'Content-Type': req.get('Content-Type'),
      'Authorization': req.get('Authorization') ? 'Bearer ***' : 'None'
    });
  }
  
  // Log request body (excluding sensitive data)
  if (req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    // Remove sensitive fields from logs
    if (sanitizedBody.password) {
      sanitizedBody.password = '***';
    }
    if (sanitizedBody.token) {
      sanitizedBody.token = '***';
    }
    logger.debug('📦 Request Body:', sanitizedBody);
  }
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢';
    
    logger.http(`${statusColor} ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    
    // Log response details for errors
    if (res.statusCode >= 400) {
      logger.warn(`⚠️  Error Response: ${res.statusCode} - ${req.method} ${req.originalUrl}`);
    }
    
    // Log slow requests
    if (duration > 1000) {
      logger.warn(`🐌 Slow Request: ${req.method} ${req.originalUrl} took ${duration}ms`);
    }
    
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = requestLogger;
