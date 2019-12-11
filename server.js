var http = require('http'); // Import Node.js core module

var server = http.createServer(function (req, res) { //create web server
    if (req.url == '/') { //check the URL of the current request

        // set response header
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        // set response content    
        res.write('<html><body><span>Main Page</span></body></html>');
        res.end();

    } else if (req.url == "/sync") {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<html><body><span>Employee Page.</span></body></html>');
        res.end();

    } else
        res.end('Invalid Request!');

});

server.listen(4000); 
console.log('port 4000 is running..')

