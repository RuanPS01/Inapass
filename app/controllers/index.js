var path = require('path');

module.exports.renderIndex =function(application, req, res){
  //Envia o arquivo HTML ao navegador na resposta
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
}
