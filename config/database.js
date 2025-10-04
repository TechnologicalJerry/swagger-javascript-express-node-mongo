const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/swagger-javascript-express-node-mongo';
    
    logger.info('🔄 Attempting to connect to MongoDB...');
    logger.info(`📍 MongoDB URI: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials in logs
    
    const conn = await mongoose.connect(mongoURI);

    logger.info(`✅ MongoDB Connected Successfully!`);
    logger.info(`🏠 Host: ${conn.connection.host}`);
    logger.info(`🗄️  Database: ${conn.connection.name}`);
    logger.info(`🔌 Port: ${conn.connection.port}`);
    logger.info(`📊 Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

    // Log database events
    mongoose.connection.on('connected', () => {
      logger.info('📡 MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    logger.error('🔍 Error details:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
