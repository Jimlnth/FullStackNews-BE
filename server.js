var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(require('body-parser').json({limit: '1mb'}));

mongoose.connect('mongodb://localhost/fullStackNews');
require('./routes/routes')(app);

app.listen(3000, function() {
	console.log('Server running on port 3000');
});