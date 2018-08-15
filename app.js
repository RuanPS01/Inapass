const server = require('./config/server');
const http = require('http');

const servidor = http.createServer(server);

servidor.listen(3000);

servidor.on('listening',function(){
    console.log(`IRIS is listening on ${servidor.address().port} in ${server.get('env')} mode.`)
})
