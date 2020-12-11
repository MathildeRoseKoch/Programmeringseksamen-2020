var Match = require('../model/class'); //hentes fra match klassen
var path = require('path');

var config = require('../database'); //hentes fra database.js
var con = config.connection;


function fetchID_and_name(req, callback) {
	con.query('SELECT * FROM users WHERE email = ?', [req.session.email], function (error, results, fields) { //forespørgslen til databasen
		if (results.length > 0) {
			var user = results[0];
			return callback(user.last_match_check_id, user.name);
		}
	});
}

// viser lister af mulige matches 
exports.possible_match = function (req, res) {
	if (req.session.loggedin && req.session.email) { // //hvis bruger er logget ind med rigtig email , fetch ID from log in in mySql

		fetchID_and_name(req, (last_m_id, last_m_name) => {
			con.query('SELECT * FROM users WHERE interest = ? AND gender = ? AND id > ? ORDER BY id ASC', [req.session.gender, req.session.interest, last_m_id], function (error, results, fields) {
				if (results.length > 0) {
					var user = results[0];
					res.render(path.join(__dirname + '/../view/posMatches.ejs'), {
						user: user
					});
	
				} else {
					res.send('You have no possible matches!');
				}
				res.end();
			});
		})
		

	}
};

exports.newprofile = function (req, res) {//viser en ny profil ved pos matchlist 
	if (req.session.loggedin == true && req.session.email) {

		var match_id = req.params.id;
		var match_name = req.params.name;
		var what_to_do = req.body.what_to_do;

		let match = new Match(req.last_m_id, req. match_id, req.last_m_name, req.match_name)
		
		con.query('UPDATE users SET last_match_check_id = ? WHERE email = ?', [match_id, req.session.email], function (error, results, fields) { }); //updatere last_match_check_id
		fetchID_and_name(req,  (last_m_id, last_m_name) => {
			switch (what_to_do) {
				case 'match':
					con.query('SELECT * FROM matches WHERE ori_user_id = ? AND match_user_id = ?', [match_id, last_m_id], function (error, results, fields) {//henter data fra matches tabellen 
						if (results.length) {
							con.query('UPDATE matches SET is_a_match = 1 WHERE ori_user_id = ? AND match_user_id = ?', [match_id, last_m_id], function (error, results, fields) { });
						} else {
							var sql = "INSERT INTO matches (ori_user_id, match_user_id, ori_user_name, match_user_name) VALUES (?, ?, ?, ?)";
							con.query(sql, [last_m_id, match_id, last_m_name, match_name], function (err, result) { });
						}
						
					});
	
					res.redirect('/matches/get-more');
					break;
	
				default:
					res.redirect('/matches/get-more');
			}
		 })

	}
};

exports.show_matches = function (req, res) {//funktion der viser brugerens matches 
	if (req.session.loggedin == true && req.session.email) {

		con.query('SELECT * FROM users WHERE email = ?', [req.session.email], function (error, results, fields) {//henter data fra usertabellen 
			if (results.length) {
				var current_user = results[0];
				con.query("SELECT * FROM matches WHERE (match_user_id = ? AND is_a_match = 1) OR (ori_user_id = ? AND is_a_match = 1)", [current_user.id, current_user.id], function (error, results1, fields) { //henter data fra matches tabellen
					if (results1.length) {
						var matches = results1;
	
						res.render(path.join(__dirname + '/../view/matches'), {
							matches: matches,
							user_name: current_user.name
						});
	
					}
					res.end();
				});

			}
		});
		
	}
};
