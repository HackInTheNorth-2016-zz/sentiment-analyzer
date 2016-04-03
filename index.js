var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('example.db');
var sentiment = require('sentiment');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
var i = 0;
var z = 0;
app.get('/run', function (req, res, data) {
db.serialize(function() {
  db.each("SELECT feedback from listdb", function(err, row) {
      body.b = parseInt(sentiment(row.feedback).score);
      var k = 0;
      k = body.b/10;
      z = z + k;
      body.b = z;
      i++;
      if(i==6){
      body.emit('update');
    }
  });  
});
var a;
body.on('update', function () {
      // a = a + m/10;
  res.render('index', {l: body.b});
});
db.close();
});