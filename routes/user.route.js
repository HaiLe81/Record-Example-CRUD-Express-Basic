var express = require('express');

var shortid = require('shortid');

var db = require('../db');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.post);

module.exports = router;