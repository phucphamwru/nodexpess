var express = require('express')

var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')

var router = express.Router()

router.get('/', controller.index);	//authMiddleware.requireAuth

router.get('/cookie', function(req, res, next){
	res.cookie('userId', 12345); // .cookie(name_cookie, value_cookie)
	res.send('Hello');
})

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', validate.createPost, controller.createPost);

router.get('/:id', controller.get);

module.exports = router;