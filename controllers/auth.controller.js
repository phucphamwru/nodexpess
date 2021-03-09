const express = require('express')
const db = require('../db');
var md5 = require('md5');
var cookieParser = require('cookie-parser')


module.exports.login = (req, res) => {
	res.render('auth/login')
}


module.exports.postLogin = (req, res) => {
	var email = req.body.email
	var password = req.body.password

	var user = db.get("users").find({ email: email }).value()

	if (!user) {
		res.render('auth/login', {
			errors: [
			'User does not exits.'
			],
			values: req.body
		});
		return;
	}

	hashedPassword = md5(password)
	if (user.password !== hashedPassword) {
		res.render('auth/login', {
			errors: [
			'Wrong password'
			],
			values: req.body
		});
		return;
	}
	console.log('den day roi3')
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect("/users");
}