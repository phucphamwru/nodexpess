var express = require('express')
var multer = require('multer')

var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')

var upload = multer({ dest: './public/uploads'});
var router = express.Router();

router.get('/', controller.index);	//authMiddleware.requireAuth

router.get('/cookie', function(req, res, next){
	res.cookie('userId', 12345); // .cookie(name_cookie, value_cookie)
	res.send('Hello');
})

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), validate.createPost, controller.createPost);

router.get('/:id', controller.get);

module.exports = router;