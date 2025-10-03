const os = require('os');
const process = require('process');
const logger = require('../config/logger');

const logSystemInfo = () => {
  logger.info('💻 ===========================================');
  logger.info('💻 System Information');
  logger.info('💻 ===========================================');
  
  // Node.js Information
  logger.info(`🟢 Node.js Version: ${process.version}`);
  logger.info(`📦 NPM Version: ${process.env.npm_version || 'Unknown'}`);
  
  // Operating System Information
  logger.info(`🖥️  Operating System: ${os.type()} ${os.release()}`);
  logger.info(`🏗️  Architecture: ${os.arch()}`);
  logger.info(`💾 Total Memory: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`);
  logger.info(`🆓 Free Memory: ${Math.round(os.freemem() / 1024 / 1024 / 1024)} GB`);
  logger.info(`⚡ CPU Cores: ${os.cpus().length}`);
  
  // Process Information
  logger.info(`🆔 Process ID: ${process.pid}`);
  logger.info(`👤 User: ${os.userInfo().username}`);
  logger.info(`📁 Working Directory: ${process.cwd()}`);
  
  // Environment Information
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔧 Port: ${process.env.PORT || '3000'}`);
  
  // Uptime
  logger.info(`⏱️  System Uptime: ${Math.round(os.uptime() / 60)} minutes`);
  
  logger.info('💻 ===========================================');
};

const logMemoryUsage = () => {
  const memUsage = process.memoryUsage();
  logger.info('🧠 Memory Usage:', {
    rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024)} MB`
  });
};

const logProcessInfo = () => {
  logger.info('⚙️  Process Information:', {
    pid: process.pid,
    platform: process.platform,
    version: process.version,
    uptime: `${Math.round(process.uptime())} seconds`,
    memoryUsage: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    }
  });
};

module.exports = {
  logSystemInfo,
  logMemoryUsage,
  logProcessInfo
};
