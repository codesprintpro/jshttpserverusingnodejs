const http = require('http');
const REQUIRED_CONTENT_TYPE = 'application/json';
const ACCEPT_ENCODING_1 = 'application/json';
const ACCEPT_ENCODING_2 = '*/*';
const GET_URL_FORMAT = "";


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
            prepareResponseHeaderObject(res);
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'POST':
            prepareResponseHeaderObject(res);
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'PUT':
            prepareResponseHeaderObject(res);
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
        case 'DELETE':
            prepareResponseHeaderObject(res);
            res.writeHead(200);
            res.end(`The request method type is ${methodType}`);
            break;
    }
}

const entryCheck = function(req){
    const contentType = req.headers["content-type"];
    if(!contentType.includes(REQUIRED_CONTENT_TYPE)){
        throw new Error("Sorry we only support content type as json format.");
    }

    const accept = req.headers["accept"];
    if(!(accept.includes(ACCEPT_ENCODING_1) || accept.includes(ACCEPT_ENCODING_2))){
        throw new Error("Sorry we only support accept json format.");
    }
}

const prepareResponseHeaderObject = function(res){
    res.setHeader('Content-Type', REQUIRED_CONTENT_TYPE);
    res.setHeader( 'Cache-Control', 'no-cache');
}

const server = http.createServer(requestListener);
server.listen(8090);
