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
	console.log('den day roi1')
	if (!user) {
		res.redirect('/auth/login');
		return;
	}
	console.log('den day roi2')
	res.locals.user = user;

	next();
}