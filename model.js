var mongo = require('mongodb');
var srv = new mongo.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongo.Db('pdis', srv);

var topicsCollection = null;

db.open(function(err, db) {
	if (!err) {
		console.log('Connected to MongoDB server!');
		
		db.collection('topics', function(err, coll) {
			if (!err) {
				topicsCollection = coll;
			}
			else {
				console.log("Error creating collection.");
			}
		});
	}
	else {
		console.log('Error connecting to MongoDB server: %s', err);
	}
});


exports.addTopic = function( title, desc, author ) {
	var newTopic = {};
	newTopic.title = title;
	newTopic.desc = desc;
	newTopic.author = author;

	topicsCollection.insert(newTopic, {safe:'true'}, function(err, objs) {
		if (err) {
			console.log('Error adding new topic: ' + err.message);
		}
		else {
			console.log('Successfully add new topic: ' + newTopic);
		}
	});
}