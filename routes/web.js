var express = require("express");
var router = express.Router();

var index_controller = require("../controllers/indexController");
const { Router } = require("express");


/** 
 * ROUTES  
**/

router.get("/", index_controller.frontpage_get)

/*
//Login Route
app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname + '/../view/login.html'));
});

//Create user post
app.post('/register-user', function (request, response) {

    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    var birthdate = request.body.birthdate;
    var gender = null;
    var interest = null;

    switch (request.body.gender) {
        case 'male':
            gender = 'male';
            break;
        case 'female':
            gender = 'female';
            break;
        default:
            gender = 'other';
    }

    switch (request.body.interest) {
        case 'male':
            interest = 'male';
            break;
        case 'female':
            interest = 'female';
            break;
        default:
            interest = 'other';
    }

    if (email && password) {
        var sql = "INSERT INTO eksamen.users (username, password, email, birthday, gender, interest) VALUES (?, ?, ?, ?, ?, ?)";

        connection.query(sql, [username, password, email, birthdate, gender, interest, newId], function (err, result) {
            if (err) throw err;
            console.log("one record added")
        });
    }

});*/

module.exports = router;