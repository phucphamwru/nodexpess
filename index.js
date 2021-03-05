const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000


app.use(bodyParser.json());	//for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));	//for parsing application/x-www-form-urlencoded
var userRoute = require('./routes/user.route')

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
  	name: 'AAA'
  });
});

app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})