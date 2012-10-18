global.fs = require('fs');
var http = require('http');
var qs = require('querystring');
var formatter = require('./htmlFormatter.js');
global.model = require('./model.js');

var requestListener = function(req, res) {
	
	console.log('REQUEST: ' + req.url);

	if (req.url == '/addtopic_confirm') {
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
	else if (req.url == '/addcomment') {
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function(data) {
				body += data;
				if (body.length > 10000) {
					req.connection.destroy();
				}
			});

			req.on('end', function() {
				console.log(body);
				var post = qs.parse(body);

				console.log(post);
			})
		}
	}
	else if (req.url == '/topics') {
		formatter.topicsPage(function(htmlStr) {
			res.writeHead(200);
			res.end(htmlStr);
		});
	}
	else if (req.url.search(/\.html$|\.js$|\.css$/) != -1) {
		global.fs.readFile(__dirname + '/content' + req.url, function(err, data) {
			if (err) {
				res.writeHead(400);
				res.end(JSON.stringify(err));
				return;
			}

			var mime = 'text/plain';
			var ext = req.url.replace(/.*[\.\/]/, '').toLowerCase();
			if (ext == 'html') {
				mime = 'text/html';
			}
			else if (ext == 'js') {
				mime = 'application/javascript';
			}
			else if (ext == 'css') {
				mime = 'text/css';
			}

			res.setHeader('Content-Type', mime);
			res.writeHead(200);
			res.end(data);
		})
	}
	else {
		res.writeHead(404);
		res.end("File not found.");
	}
}

var server = http.createServer(requestListener);
server.listen(3000, "50.116.22.131");