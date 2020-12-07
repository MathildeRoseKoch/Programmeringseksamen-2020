//håndterer menu
var path = require('path');

var config = require('../database.js');
var User = require('../model/class');
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

	if (req.body.email && req.body.password) {
		con.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], function(error, results, fields) {
			if (results.length > 0) {
				var user = new User(results[0].email, results[0].password, results[0].name, results[0].interest, results[0].gender)
				if (user.password == req.body.password) {
					req.session.loggedin = true;
					req.session.email = user.email;
					req.session.interest = user.interest;
					req.session.gender = user.gender;
					res.redirect('/user');
				}
				
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
};

exports.logout = function(req, res) { //redirecter til orginal siden 
	let logout_user = new User(req.session.email, req.session.password)

	var loggedin = req.session.loggedin;

	if (logout_user.email && loggedin) { 
		req.session.destroy();
	}
	res.redirect('/');
};

