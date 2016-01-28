var New = require('../models/New');

module.exports = function(app) {
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
				var comment = specificNew.addComment(req.body);
				specificNew.save(function(err) {
					if (err) {
						res.send(err);
						return;
					}
					res.json(comment);
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
}
