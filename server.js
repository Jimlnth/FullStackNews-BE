var express = require('express');
var app = express();

app
	.get('/', function(req, res) {
		res.send('Home page');
	})
	.use(function(req, res, next) {
		res.send(404, 'This page does not exists');
	});

app.listen(3000, function() {
	console.log('Server running on port 3000');
});