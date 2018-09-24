var express = require('express');
var request = require('request')
var server = express();
var credentials = require('./credentials.json');
var http = require('http');
const bodyParser = require('body-parser');
server.use(bodyParser.json());

const bdAddr = "192.168.100.115:5984/";

server.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

server.get('/', function(req, res) {
  res.send("AYY HELLLOUUU WOOOORLD WOOHOOO EYEYEYok.")
});

server.listen(3000, function (req, res) {
  console.log(`IRIS is operating in ${server.get('env')} mode at port 3000`)
  console.log("Checking DB connection...");

  var rq = http.get("http://192.168.100.115:5984/passdb", function(res){
    console.log("DB status code: "+res.statusCode);
    if(res.statusCode !== 200){
      console.log("Database connection failed. Exiting..");
      process.exit(1);
    }else{
      console.log("DB is good to go.");
    }
  });
});

server.post('/newEntry', function(req, res){
  console.log("New entry request.");
  console.log(req.body);
  output = req.body
  uuid = retrieveUUIDFromCouchDB();
  build_input = {
    "date": "20/09/2018",
    "pwd": "09b48f7ab93",
    "name":"AWebsite",
    "description": "Senha do meu site"
  }
  //Realiza o request para inclusão do documento no BD
  request({
    url: 'http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+uuid.uuids[0],
    method: "PUT",
    json: true,   // <--Very important!!!
    body: build_input
  }, function (error, response, body){
    console.log('PUT response: ');
    console.log(response.body);
  });

  res.send("OK");
});

function retrieveUUIDFromCouchDB(){
  //TODO: DITCH REQUESTS IN FAVOR OF AXIOS
  request('http://'+bdAddr+'/_uuids', function (error, response, body) {
  console.log('error:', error)
  console.log('statusCode:', response && response.statusCode); // código de status
  console.log('UUID got: '+body);
  output_json = JSON.parse(body);
  console.log(output_json.uuids[0]);
  return output_json;
});
}
