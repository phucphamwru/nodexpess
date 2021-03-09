var db = require('../db')
var cookieParser = require('cookie-parser')

module.exports.requireAuth = (req, res, next) => {
	//kiem tra cookie
	console.log(req.cookies.userId)
	if (!req.cookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get("users").find({
		id : req.cookies.userId
	}).value();
	console.log(user);
	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	next();
}