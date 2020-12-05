/*^const { expect } = require("chai");
const { logout } = require("../controllers/loginController");

    var email = req.session.email;
	var loggedin = req.session.loggedin;

    describe(logout(), function(){
        it("burde logout", function(){
            email && loggedin 
                req.session.destroy();
            
        expect(res.redirect('/'))
        
        })
    })*/



    const { response } = require("express");
    const expect = require("chai").expect
    const fetch = require("node-fetch")
    
    describe("test af endpoint", function(){  
        it('should return > html file <', function () {
           fetch("http://localhost:4300").then (response => {
                response.should.have.status(200)
           })
           
        });
    })
          
    
    
    
    
    

