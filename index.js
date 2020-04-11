require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});


var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var authMiddlelware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var apiProductRoute = require('./api/routes/product.route')

var port = 3100;

var app = express();

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api/products', apiProductRoute)

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/', (req, res) => {
    res.render('index')
});

app.use(express.static('public'))

app.use('/users', authMiddlelware.requireAuth,  userRoute);
app.use('/auth', authRoute);
app.use('/products', authMiddlelware.requireAuth, productRoute)
app.use('/cart', authMiddlelware.requireAuth, cartRoute)
app.listen(port, () => {
    console.log('Server listening on port ', port)
});