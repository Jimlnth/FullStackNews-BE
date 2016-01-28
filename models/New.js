var mongoose = require('mongoose');

var newSchema = new mongoose.Schema({
	title: String,
	link: String,
	votes: Number,
	comments: [{content: String}]
});

newSchema.methods.vote = function() {
	this.votes++;
	return this.votes;
};

newSchema.methods.addComment = function(comment) {
	this.comments.push(comment);
	return comment;
}

var New = mongoose.model('New', newSchema);
module.exports = New;