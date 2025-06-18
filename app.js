const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files (Optional – useful only if serving public assets)
app.use(express.static(path.join(__dirname, 'public')));

// Base routes
app.use('/api', indexRouter);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(req.app.get('env') === 'development' && { error: err }),
  });
});

module.exports = app;
