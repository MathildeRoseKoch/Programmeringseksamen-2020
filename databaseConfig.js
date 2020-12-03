var mysql = require('mysql');
var config = {
	host     : 'localhost',
	user     : 'test',
	password : 'test',
	database : 'proeksamen'
};

var connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = {
     connection : mysql.createConnection(config)
}
