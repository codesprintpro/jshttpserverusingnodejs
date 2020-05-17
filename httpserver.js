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
                getMethodHandler(url, req, res);
                break;
            case 'POST':
                getRequestBodyAndGenerateResponse(req, res, postMethodHandler);
                break;
            case 'PUT':
                getRequestBodyAndGenerateResponse(req, res, putMethodHandler);
                break;
            case 'DELETE':
                deleteMethodHandler(url, req, res);
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

const getMethodHandler = (url, req, res) => {
    const employeeId = url.substring(1);
    const employee = dataRetriever.findEmployee(employeeId);
    if (!employee) {
        res.writeHead(400);
        res.end(`The employee with id ${employeeId} is not present.`);
        return;
    }
    prepareResponseHeaderObject(res);
    res.writeHead(200);
    res.end(JSON.stringify(employee));
}

const postMethodHandler = (res, body) => {

    try {
        let reqBody = body;
        if (reqBody && reqBody._id && reqBody.name.first && reqBody.name.last && reqBody.phone) {
            dataRetriever.addEmployee(reqBody);
        } else {
            throw new Error("Please enter all necessary details of employee object (id, name.first, name.last and phone).");
        }
        prepareResponseHeaderObject(res);
        res.writeHead(200);
        res.end(`The Employee object with id is ${reqBody._id} added.`);
    } catch (error) {
        res.writeHead(400);
        res.end(error.message);
    }
}

const putMethodHandler = (res, body) => {
    try {
        let reqBody = body;
        if (reqBody && reqBody._id && reqBody.name.first && reqBody.name.last && reqBody.phone) {
            let response = dataRetriever.findAndReplace(reqBody);
            if(!response)
                throw new Error(`The Employee object with id is ${reqBody._id} not found.`);
        } else {
            throw new Error("Please enter all necessary details of employee object (id, name.first, name.last and phone).");
        }
        prepareResponseHeaderObject(res);
        res.writeHead(200);
        res.end(`The Employee object with id is ${reqBody._id} replaced.`);
    } catch (error) {
        res.writeHead(400);
        res.end(error.message);
    }
}

const deleteMethodHandler = (url, req, res) => {
    const employeeId = url.substring(1);
    const response = dataRetriever.deleteEmployee(employeeId);
    if (!response) {
        res.writeHead(400);
        res.end(`The employee with id ${employeeId} is not present.`);
        return;
    }
    prepareResponseHeaderObject(res);
    res.writeHead(200);
    res.end(`The employee with id ${employeeId} is deleted.`);
}

const getRequestBodyAndGenerateResponse = (req, res, callback) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(res, JSON.parse(body));
    });
}

const server = http.createServer(requestListener);
server.listen(8090);
