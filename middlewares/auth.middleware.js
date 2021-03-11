var db = require('../db')
var cookieParser = require('cookie-parser')

module.exports.requireAuth = (req, res, next) => {
	//kiem tra cookie
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get("users").find({
		id : req.signedCookies.userId
	}).value();
	
	if (!user) {
		res.redirect('/auth/login');
		return;
	}
	
	res.locals.user = user;

	next();
}