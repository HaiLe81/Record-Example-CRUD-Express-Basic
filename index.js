var express = require('express');
var app = express();

var shortid = require('shortid');

var db = require('./db');

var userRoute = require('./routes/user.route');

var port = 3100;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hai Le'
    })
});

app.use(express.static('public'))

app.use('/users', userRoute);

app.listen(port, () => {
    console.log('Server listening on port ', port)
});