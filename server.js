var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(require('body-parser').json({limit: '1mb'}));
mongoose.connect('mongodb://localhost/fullStackNews');
require('./routes/routes')(app);

app.listen(3000, function() {
	console.log('Server running on port 3000');
});