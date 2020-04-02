var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

// router.get('/navigation', controller.postNavigation)

router.post('/create', validate.postCreate, controller.post);

router.get('/info/changePassword', controller.changePassword);

router.post('/info/changePassword', controller.postChangePassword);

module.exports = router;