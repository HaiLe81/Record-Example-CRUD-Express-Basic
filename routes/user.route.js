var express = require('express');
var multer  = require('multer')

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' })

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

// router.get('/navigation', controller.postNavigation)

router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.post
);

router.get('/info/changePassword', controller.changePassword);

router.post('/info/changePassword', controller.postChangePassword);

module.exports = router;