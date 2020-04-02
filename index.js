require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
var authMiddlelware = require('./middlewares/auth.middleware');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var port = 3100;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hai Le'
    })
});

app.use(express.static('public'))

app.use('/users', authMiddlelware.requireAuth,  userRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log('Server listening on port ', port)
});