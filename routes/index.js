var express = require('express');
var router = express.Router();
var authRouter = require('./auth');
var usersRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// API Routes
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);

module.exports = router;
