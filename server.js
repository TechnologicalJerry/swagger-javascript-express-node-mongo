#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('swagger-javascript-express-node-mongo:server');
var http = require('http');
var connectDB = require('./config/database');
var logger = require('./config/logger');
var { logSystemInfo, logMemoryUsage } = require('./utils/systemInfo');

// Display server startup banner
logger.info('🚀 ===========================================');
logger.info('🚀 Starting User CRUD API Server');
logger.info('🚀 ===========================================');

// Log system information
logSystemInfo();

// Log initial memory usage
logMemoryUsage();

// Connect to database
connectDB();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Log server configuration
logger.info('⚙️  Server Configuration:');
logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
logger.info(`🔌 Port: ${port}`);
logger.info(`📁 Working Directory: ${process.cwd()}`);
logger.info(`🕐 Start Time: ${new Date().toISOString()}`);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

logger.info(`🔄 Starting server on port ${port}...`);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    logger.error('❌ Server error (not listen):', error);
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`❌ ${bind} requires elevated privileges`);
      logger.error('💡 Try running with sudo or use a different port');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`❌ ${bind} is already in use`);
      logger.error('💡 Try using a different port or kill the process using this port');
      process.exit(1);
      break;
    default:
      logger.error('❌ Unknown server error:', error);
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  
  logger.info('🎉 ===========================================');
  logger.info('🎉 Server Successfully Started!');
  logger.info('🎉 ===========================================');
  logger.info(`🌐 Server running on: http://localhost:${addr.port}`);
  logger.info(`📚 API Documentation: http://localhost:${addr.port}/swagger-ui`);
  logger.info(`🔌 Listening on: ${bind}`);
  logger.info(`🕐 Server started at: ${new Date().toISOString()}`);
  logger.info('🎉 ===========================================');
  
  // Log memory usage every 5 minutes
  setInterval(() => {
    logMemoryUsage();
  }, 5 * 60 * 1000);
  
  debug('Listening on ' + bind);
}
