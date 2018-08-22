var express = require('express');
var server = express();

server.get('/', function(req, res) {
  res.send("AYY HELLLOUUU WOOOORLD WOOHOOO EYEYEYok.")
});

server.listen(3000, function (req, res) {
  console.log(`IRIS is operating in ${server.get('env')} mode at port 3000`)
});
