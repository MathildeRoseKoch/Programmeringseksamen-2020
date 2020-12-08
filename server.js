var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var allRoutes = require('./routes/routes');



var app = express(); //Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side. - carry session


app.use(cors()); //cors
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); //bruger ejs, så man ikke skal loade template

app.use(session({ //localStorage med cookies
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', allRoutes); //bruger routes til app

app.listen(4300);

module.exports = app;
