const http = require('http');
const dataRetriever = require('./dataRetriever.js');
const REQUIRED_CONTENT_TYPE = 'application/json';
const ACCEPT_ENCODING_1 = 'application/json';
const ACCEPT_ENCODING_2 = '*/*';
const GET_URL_REGEX = "(\/)[A-Za-z0-9]+";

const requestListener = function (req, res) {

    try {
        entryCheck(req);

        const methodType = req.method.toUpperCase();
        const url = req.url;
        console.log(Object.getOwnPropertyNames(req));
        console.log(req.url);
        switch (methodType) {
            case 'GET':
                const employee = dataRetriever.findEmployee(url.substring(1));
                prepareResponseHeaderObject(res);
                res.writeHead(200);
                res.end(JSON.stringify(employee));
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
    } catch (error) {
        res.writeHead(400);
        res.end(error.message);
    }
}

const entryCheck = function (req) {
    const contentType = req.headers["content-type"];
    if (!contentType.includes(REQUIRED_CONTENT_TYPE)) {
        throw new Error("Sorry we only support content type as json format.");
    }

    const accept = req.headers["accept"];
    if (!(accept.includes(ACCEPT_ENCODING_1) || accept.includes(ACCEPT_ENCODING_2))) {
        throw new Error("Sorry we only support accept json format.");
    }
}

const prepareResponseHeaderObject = function (res) {
    res.setHeader('Content-Type', REQUIRED_CONTENT_TYPE);
    res.setHeader('Cache-Control', 'no-cache');
}

const checkURLExpression = function (url, regex) {

}

const server = http.createServer(requestListener);
server.listen(8090);
