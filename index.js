const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json());	//for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));	//for parsing application/x-www-form-urlencoded

// var users = [
// 	{ id : 1, name:'Phuc'},
// 	{ id : 2, name:'Duc'},
// 	{ id : 3, name:'Nam'}
// ];

// db.get('/users').value()		-> 

app.get('/', (req, res) => {
  res.render('index', {
  	name: 'AAA'
  });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
  	users: db.get("users").value()
  });
});

app.get('/users/search', function(req, res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});

	res.render('users/index',{
		users: matchedUsers
	});
});

app.get('/users/create', (req, res) => {
	res.render('users/create');
});

app.post('/users/create', (req, res) => {
	db.get("users").push(req.body).write();
	res.redirect('/users');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})