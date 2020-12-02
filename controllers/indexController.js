//håndterer menu

var path = require("path");

//Register Route
exports.frontpage_get = function(req, res){
    res.sendFile(path.join(__dirname + "/../views/register.html"))
};

