const { response } = require("express");
const expect = require("chai").expect
const fetch = require("node-fetch")

describe("test af endpoint register", function(){  
    it('should return > html file <', function () {
       fetch("http://localhost:4300/user").then (response => {
            response.should.have.status(200)
       })
       
    });
})

