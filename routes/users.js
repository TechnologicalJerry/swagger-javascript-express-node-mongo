var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controllers');


router.post('/register', UserController.createUser);

router.get('/getAll', UserController.findAll);

router.get('/getOne/:id', UserController.findOne);

router.patch('/update/:id', UserController.updateById);

router.delete('/delete/:id', UserController.delete);

module.exports = router;
