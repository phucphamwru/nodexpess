var express = require('express')
const shortid = require('shortid');
const db = require('../db');


// db.get('<key>').value()		->  lay ra gia tri cua bang(key)

var router = express.Router()

router.get('/', (req, res) => {
  res.render('users/index', {
  	users: db.get("users").value()
  });
});

router.get('/search', function(req, res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});

	res.render('users/index',{
		users: matchedUsers
	});
});

router.get('/create', (req, res) => {
	res.render('users/create');
});

router.post('/create', (req, res) => {
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');
});

router.get('/:id', (req,res) => {	//:id la Route Parameter - 1 tham so gi do
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	console.log(user)
	res.render('users/view',{
		user: user
	});
});

module.exports = router;