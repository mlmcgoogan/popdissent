//var fs = require('fs');

exports.topicsPage = function(callback) {
	global.fs.readFile(__dirname + '/content/topics.html', 'utf8', function(err, data) {
		if (err) {
			console.log('ERROR reading topics: ' + err.message);
		}
		else {
			global.model.allTopics(function(err, items) {
				if (!err) {
					var str = '';

					for (var i=0 ; i<items.length ; i++) {
						var item = items[i];

						str += '\n<p>' + item.title + ' -- ' + item.desc + '</p>';
					}

					data = data.replace('###TOPICSLIST###',str);

					callback(data);
				}
			});
		}
	});
}