var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dlwnsgk94',
  //password: '111111',
	database: 'cap'
});

//Establish MySQL connection
connection.connect(function(err) {
  if (err)
    throw err;
  else {
     console.log('Connected to MySQL');
     // Start the app when connection is ready
     app.listen(3000);
     console.log('Server listening on port 3000');
  }
});

function isEmptyEl(array, i) {
   return !(array[i]);
}

app.get('/', function(req, res) {
  values = [];

  // String 형식으로 받음.
  var jsondata = fs.readFileSync("./test.json", 'utf8');
  var modified = JSON.parse(jsondata.trim());

  for (var i = 0; i <= Object.keys(modified.user).length-1; i++) {
    values.push([modified.user[i].name, modified.user[i].date]);
  }

  // MySQL insert query
  connection.query('INSERT INTO user (name, date) VALUES ?', [values], function(err,result) {
    if(err) {
      console.log(err.toString());
    } else {
      console.log("Success");
    }
    });
});
