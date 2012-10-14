global.fs = require('fs');
var http = require('http');
var qs = require('querystring');
var formatter = require('./htmlFormatter.js');
global.model = require('./model.js');

var requestListener = function(req, res) {
	
	if (req.url == '/addtopic') {
		global.fs.readFile(__dirname + '/content/add.html', function(err, data) {
			if (err) {
				res.writeHead(400);
				res.end(JSON.stringify(err));
				return;
			}

			res.writeHead(200);
			res.end(data);
		});
	}
	else if (req.url == '/addtopic_confirm') {
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function(data) {
				body += data;
				if (body.length > 10000) {
					req.connection.destroy();
				}
			});

			req.on('end', function() {
				var post = qs.parse(body);

				model.addTopic(post.title, post.desc, 'Matthew McGoogan');
			})
		}
	}
	else if (req.url == '/topics') {
		formatter.topicsPage(function(htmlStr) {
			res.writeHead(200);
			res.end(htmlStr);
		});
	}

	else {
		res.writeHead(404);
		res.end("File not found.");
	}
}

var server = http.createServer(requestListener);
server.listen(3000, "50.116.22.131");