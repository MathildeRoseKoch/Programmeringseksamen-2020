var User = require('../model/class');
var path = require('path');

var config = require('../database');
var con = config.connection;

// viser liste af alle useres 
exports.user_list = function(req, res) {
    res.send('Possible match list'); //henviser til possible matches
};

// viser profile for spesifik bruger
exports.user_detail = function(req, res) {

	if(req.session.loggedin == true && req.session.email) {


		con.query('SELECT * FROM users WHERE email = ?', [req.session.email], function(error, results, fields) {
			if (results.length > 0) {
				req.session.gender = results[0].gender;
				req.session.interest = results[0].interest; //objekt orienteret 

				res.render(path.join(__dirname + '/../view/profile'), {
			        user: results[0]
			    });

			} else {
				res.send('server error');
			}			
			res.end();
		});
	}
};

// bruger get til at en update funktion
exports.user_create_get = function(req, res) {
    res.sendFile(path.join(__dirname + '/../view/register.html'));
};


// Håndtere opdaterging af bruger information 
exports.user_create_post = function(req, res) {
	let user = new User(req.body.email, req.body.password, req.body.name, req.body.interest, req.body.gender)
   
	if (user.email && user.password) {
		var sql = "INSERT INTO users (name, gender, interest, email, password) VALUES (?, ?, ?, ?, ?)";
		con.query(sql, [user.name, user.gender, user.interest, user.email, user.password], function (err, result) {
			if (err) {
				throw err;
			} else {
				req.session.loggedin = true;
				req.session.email = user.email;
				res.redirect('/user');
			} 
		});
	} else {
		res.send('Enter Username and Password!'); //fejlmedlning hvis man ikke har indsat alle værdier
		res.end(); // hvis man har fører den til profile 
	}
};



exports.user_delete_get = function(req, res) { //delete funktion med GET
	console.log("SESSION ID: " + req.params.id);
	
	if(req.session.loggedin == true) {
		con.query(`DELETE FROM users WHERE id = ${req.params.id}`, function (err, result) { // henter data fra useres tabellen  
			if (err) {
				throw err;
			} else {
		
			}
		});
	}
	else {
		
	}
	
    res.send('Your profile is deleted');

	res.redirect('/')
};


exports.user_delete_post = function(req, res) { //delete funktion med POST
	if(req.session.loggedin == true) {
		con.query(`DELETE FROM users WHERE id = ${req.session.id}`, function (err, result) {
			if (err) {
				throw err;
			} else {
				
			}
		});
	}
	else {
		
	}
    res.send('Your profile is deleted');
};


exports.user_update_get = function (req, res) { // opdater 
	if (req.session.loggedin == true) {
		con.query(`UPDATE users set password = ${req.params.newPassword} WHERE id = ${req.params.id}`, function (err, result) { //henter data fra useres tabellen 
			if (err) {
				throw err;
			} else {
				
			}
		});
	}
	else {

	}
	res.send('Your user has been updated');
};


exports.user_update_password_get = function (req, res) { //opdaterer password 
	console.log(req.body.newPassword);
	if (req.session.loggedin == true) {
		con.query(`UPDATE users set password = ${req.body.newPassword} WHERE id = ${req.params.id}`, function (err, result) {
			if (err) {
				throw err;
			} else {
				//redirect
			}
		});
	}
	else {
		
	}
	res.send('your user has been updated');
};


exports.user_update_post = function (req, res) { // post opdateringen 
	if (req.session.loggedin) {
		const { name } = req.body;

		con.query(`UPDATE users SET name = ${name} WHERE email = ${req.session.email}`)

		
	} else {

	}
	res.send('Your user has been updated');
};