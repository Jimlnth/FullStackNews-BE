var express = require('express');

var app = express();

var mongoose = require('mongoose');
var New = require('./models/New');

app.use(require('body-parser').json({limit: '1mb'}));

//CREATE
/*
var someNew = new New({
	title: 'Google exists !',
	link: 'http://google.com',
	votes: 0,
	comments: [{content: 'Nice !'}, {content: 'This is a new era.'}]
});
someNew.save(function(err) {
	if (err) {
		throw err;
	}
	console.log('saved successfully');
});
*/

//DELETE
/*
New.findOneAndRemove({ title: 'Google exists !' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
*/

mongoose.connect('mongodb://localhost/fullStackNews');

app
	.get('/news', function(req, res) {
		New.find(function(err, news) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(news);
		});
	})
	.get('/new/:id', function(req, res) {
		New.findById(req.params.id, function(err, specificNew) {
		    if (err) {
				res.send(err);
				return;
			}
		  res.json(specificNew);
		});
	})
	.put('/new/:id/vote', function(req, res) {
		New.findById(req.params.id, function(err, specificNew) {
		    if (err) {
				res.send(err);
				return;
			}
		  var votes = specificNew.vote();
		  specificNew.save(function(err) {
			    if (err) {
					res.send(err);
					return;
				}
			  res.send("" + votes);
			});
		});
	})
	.put('/new/:id/comment', function(req, res) {
		New.findById(req.params.id, function(err, specificNew) {
			if (err) {
					res.send(err);
					return;
			}
			if (Object.keys(req.body).length == 0) {
				res.send('The comment you want to add is empty');
				return;
			}
			var comments = specificNew.addComment(req.body);
			specificNew.save(function(err) {
				if (err) {
					res.send(err);
					return;
				}
				res.json("" + comments);
			});
		});
	})
	.post('/new', function(req, res) {
		var newNew = new New(req.body);
		newNew.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json("" + newNew);
		});
	});

app.listen(3000, function() {
	console.log('Server running on port 3000');
});