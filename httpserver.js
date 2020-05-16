const http = require('http');
const REQUIRED_CONTENT_TYPE = 'application/json';

const requestListener = function (req, res) {

    try{
        entryCheck(req);
    }catch(error){
        res.writeHead(400);
        res.end(error.message);
    }

    const methodType = req.method.toUpperCase();
    console.log(Object.getOwnPropertyNames(req));
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

const entryCheck = function(req){
    const contentType = req.headers["content-type"];
    if(!contentType.includes(REQUIRED_CONTENT_TYPE)){
        throw new Error("Sorry we don't support accept json format.");
    }
}

const server = http.createServer(requestListener);
server.listen(8090);
