const express = require('express');
const sourceMapSupport = require('source-map-support');

//--- static data -----
const symbols = [
  {symbol : "AAPL", company : "Apple"},
  {symbol : "AMX",  company : "Amx com"},
  {symbol : "AMX 2",  company : "Amx com2"},
  {symbol : "AMX 3",  company : "Amx com3"},
  {symbol : "AMX 4",  company : "Amx com3"},
  {symbol : "MSFT", company : "Microsoft"},
  {symbol : "CC",   company : "CC Company"},
  {symbol : "CC2",  company : "CC2 Company"},
  {symbol : "CSCO", company : "Cisco"},
  {symbol : "IBM",  company : "IBM"},
  {symbol : "IIS",  company : "IIS Company"},
  {symbol : "IXIC",  company : "Nasdaq"}];
//---------------------

let app = express();
let PORT = process.env.PORT || 3000;
sourceMapSupport.install();
/*
let CLIENT_DIR = path.resolve(`./client/static_content/`);
let INDEX_PAGE = `${CLIENT_DIR}/index.html`;
*/

app.get('/api/symbols', function(req, res){
    res.send({ symbols : symbols });
});

app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});