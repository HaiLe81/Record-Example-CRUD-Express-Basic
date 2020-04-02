var express = require('express');

var controller = require('../controllers/auth.controller');
var validate = require('../validate/register.validate');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/logout', controller.postLogOut);

router.get('/register', controller.register);

router.post('/register', controller.postRegister);

module.exports = router;