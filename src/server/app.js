'use strict';

console.log('POOP');
var express = require('express');
var app = new express();

var staticPath = __dirname + '/../../dist';

console.log('staic path is', staticPath);

app.use('/', express.static(staticPath));

var server = app.listen(8080, function serveApp() {
	console.log('Listening on port %d', server.address().port);
});
