const { expect } = require("chai");
const { logout } = require("../controllers/loginController");

    var email = req.session.email;
	var loggedin = req.session.loggedin;

    describe(logout(), function(){
        it("burde logout", function(){
            email && loggedin 
                req.session.destroy();
            
        expect(res.redirect('/'))
        
        })
    })
