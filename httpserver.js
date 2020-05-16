const http = require('http');

const requestListener = function (req, res) {

    const methodType = req.method.toUpperCase();
    switch(methodType){
        case 'GET':
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'POST':
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'PUT':
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'DELETE':
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
    }
}

const server = http.createServer(requestListener);
server.listen(8090);
