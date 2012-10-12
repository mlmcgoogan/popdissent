var fs = require('fs');
var http = require('http');
var requestListener = function(req, res) {
	
	if (req.url == '/') {
		fs.readFile(__dirname + '/content/index.html', function(err, data) {
			if (err) {
				res.writeHead(400);
				res.end(JSON.stringify(err));
				return;
			}

			res.writeHead(200);
			res.end(data);
		});
	}
	else {
		res.writeHead(404);
		res.end("File not found.");
	}
}

var server = http.createServer(requestListener);
server.listen(3000, "50.116.22.131");