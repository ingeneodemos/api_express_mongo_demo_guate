if(process.argv.length>=3 && (process.argv[2]=="production" || process.argv[2]=="testing")){
  global.config = require("./config/"+process.argv[2]);
}else{
  global.config = require("./config/development");
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

global.msg = require("./config/common/msg");
global.queries = require("./config/common/queries");

global.utils = require("./helpers/utils");
global.log = require("./helpers/log");

const puerto = process.env.PORT || config.apiPort;

var mongoose=require("mongoose");
var schema=require("./models/client");
mongoose.connect(config.mongoUrl);

var Client = mongoose.model('Client', schema, 'client');

app.set('port', puerto);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", config.allowHttpMethods);
  next();
});

app.use(global.utils.getUrlApi("client"), function(req, res, next){
    req.Client=Client;
    next();
});
app.use(global.utils.getUrlApi("client"), require("./services/client"));

app.use(function(req, res){
    res.status(404);
    res.send(global.utils.error(global.msg.resource_not_found));
});

var server = app.listen(config.apiPort, config.host, config.backlog, function(){
    var host = server.address().address;
    var port = server.address().port;
    log.info("escuchando  : %s:%s", host, port);
});