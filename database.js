var mysql = require('mysql'); // information til Mysql database 
var config = {
	host     : 'localhost',
	user     : 'test',
	password : 'test',
	database : 'proeksamen'
};

var connection = mysql.createConnection(config); //connecter til mysql database, med vaglte info

connection.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('id' + connection.threadId); //statement der viser om jeg er connected til databse, og skaber et id, der tæller op med skabte brugere 
});

module.exports = {
     connection : mysql.createConnection(config) //eksportere database 
}
