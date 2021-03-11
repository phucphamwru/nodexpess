require('dotenv').config() //bien moi truong .env de tren dau cang som cang tot.

const express = require('express')

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route');

const app = express()
const port = 3000


app.use(bodyParser.json());	//for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));	//for parsing application/x-www-form-urlencoded

app.use(cookieParser("secret")) //process.env.SESSION_SECRET
app.use(sessionMiddleware);

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
  	name: 'AAA'
  });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})