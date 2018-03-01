const express = require('express');
const sourceMapSupport = require('source-map-support');

let app = express();
let PORT = 3000;
sourceMapSupport.install();
/*
let CLIENT_DIR = path.resolve(`./client/static_content/`);
let INDEX_PAGE = `${CLIENT_DIR}/index.html`;
*/

app.get('/api/*', function(req, res){
    res.send({body : "Hello world from Server!!"});
});

app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});