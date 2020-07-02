const express = require('express');
const bodyParser = require('body-parser');

const overviewRouter = express.Router();

overviewRouter.use(bodyParser.json());

overviewRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send an overview to you');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST not supported on /overview.');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /overview.');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE not supported on /overview.');
});

module.exports = overviewRouter;