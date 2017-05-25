const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    switch (req.url) {
        case '/about':
            res.write('About');
            break;

        default:
            res.write('Home');
            break;
    }
    res.end();
});

server.listen(8000);