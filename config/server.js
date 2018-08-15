const express = require('express');
const consign = require('consign');
const app = express();

app.set('view engine', 'html');
app.set('views', './app/views');
consign()
  .include('app/routers')
  //.then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports= app;
