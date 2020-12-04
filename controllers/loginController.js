//håndterer menu
var path = require('path');

var config = require('../database.js');
var con = config.connection;

// viser profile for hver user og registere routes
exports.frontpage_get = function(req, res) {
	if(req.session.loggedin == true && req.session.email) {//validere
		res.redirect('/user'); 
	}
    res.sendFile(path.join(__dirname + '/../view/login.html')); //transportere fil til html
};

exports.login_post = function(req, res) { //ekportere login information til MySQL database 

	console.log(req.session.touch());

    var email = req.body.email;
	var password = req.body.password;

	if (email && password) {
		con.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], function(error, results, fields) {
			if (results.length > 0) {


				var user = results[0];

				req.session.loggedin = true;
				req.session.email = req.body.email;
				req.session.interest = user.interest;
				req.session.gender = user.gender;

				res.redirect('/user');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
};

exports.logout = function(req, res) { //redirecter til orginal siden 

    var email = req.session.email;
	var loggedin = req.session.loggedin;

	if (email && loggedin) { 
		req.session.destroy();
	}
	res.redirect('/');
};

