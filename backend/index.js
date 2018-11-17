var express = require('express');
var request = require('request');
const axios = require('axios');
var path = require('path');
var server = express();
var credentials = require('./credentials.json');
var http = require('http');
var utils = require('./utils')
const bodyParser = require('body-parser');
server.use(bodyParser.json());

const bdAddr = "192.168.100.107:5984/";

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
  res.sendFile('app/views/tableHome/tableHome.html', "../");
  //res.sendFile(path.resolve('../app/views/tableHome/tableHome.html'));
  //res.send("<h1>lalallalal</h1>");
});

server.listen(3000, function (req, res) {
  console.log(`IRIS is operating in ${server.get('env')} mode at port 3000`)
  console.log("Checking DB connection...");

  var rq = http.get("http://"+bdAddr+"passdb", function(res){
    console.log("DB status code: "+res.statusCode);
    if(res.statusCode !== 200){
      console.log("Database connection failed. Exiting..");
      process.exit(1);
    }else{
      console.log("DB is good to go.");
    }
  });
});

//deleteEntry?docId=(id)
//payload: (nada)
server.post('/deleteEntry', function(req, res){
  console.log("Delete request. Retrieving data..");
  axios.get('http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+req.query.docId)
  .then(function (response) {
    console.log(response.data);

    //Send the delete command to the DB based on latest revision
    axios.delete('http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+response.data._id+'?rev='+response.data._rev)
    .then(function(response){
      console.log('[couchdb]Document deletion is complete! Report: '+response.data.ok)
    })
    .catch(function error(){
      console.log(error);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

  res.send("OK")
});

//updateEntry?docId=(id)
//payload: json do doc atualizado
server.post('/updateEntry', function(req, res){
  console.log("Update request. Retrieving data...");
  var recData = req.body
  axios.get('http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+req.query.docId)
  .then(function (response) {
    axios.put('http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+response.data._id, {recData, '_rev':response.data._rev})
    .then(function (response){
      console.log("[couchdb]Succesfully updated document!");
    })
    .catch(function (error){
      console.log(error);
    });
  })

  res.send("OK");
});

//listEntry
server.get('/listEntry', function(req, res){
  console.log('Database docs have been queried.');
  var docs;

  axios.get('http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb/_design/pwds/_view/all')
  .then(function (response){
    console.log('[couchdb] Passbase requested!');
    var docs = response.data.rows;

    //monta resposta
    res.setHeader('Content-Type', 'application/json');
    console.log('Sent docs.');
    res.json(docs);
  })
  .catch(function (error){
    console.log(error);
  });
})

//newEntry
//payload: json do doc a ser inserido no banco de dados
server.post('/newEntry', function(req, res){
  console.log("New entry request. Generating database info..");
  output = req.body
  output.pwd = utils.generateString();

  //Todo: receive request as formatted body from frontend
  //Example input:
  //build_input = {
  //  "date": utils.generateDateString(),
  //  "pwd": utils.generateString(),
  //  "name":"AWebsite",
  //  "description": "Senha do meu site"
  //}

  console.log('Dispatching new object: %O', output);
  uuid = databasePUT(output);

  res.send("OK");
});

async function databasePUT(build_input){
  await axios.get('http://'+bdAddr+'/_uuids')
    .then(function (response) {
      console.log('[couchdb]UUID Get! > '+response.data.uuids[0]);

      //Realiza o request para inclusão do documento no BD
      request({
        url: 'http://'+credentials.name+':'+credentials.password+'@'+bdAddr+'/passdb'+'/'+response.data.uuids[0],
        method: "PUT",
        json: true,   // <--- Very importante!!!
        body: build_input
      }, function (error, response, body){
        console.log('[couchdb]PUT response: '+response.body.ok);
        console.log(response.body);
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    return NaN;
}
