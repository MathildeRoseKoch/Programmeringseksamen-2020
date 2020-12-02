var mysql = require('mysql');
var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
var path = require("path");
var allRoutes = require("./routes/web")


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'proeksamen',
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});



app.listen(3000);
console.log("Server started...");