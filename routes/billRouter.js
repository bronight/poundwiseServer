const express = require('express');
const bodyParser = require('body-parser');

const billRouter = express.Router();

billRouter.use(bodyParser.json());

billRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the bills to you.');
})
.post((req, res) => {
    res.end(`Will add the bill: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /bills.');
})
.delete((req, res) => {
    res.end('Deleting all bills');
});

billRouter.route('/:billID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the bill ${req.params.billID} to you.`);
})
.post((req, res) => {
    res.end(`Will add the bill: ${req.params.billID} with the name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`Will update the bill ${req.params.billID}.`);
})
.delete((req, res) => {
    res.end(`Will delete the bill: ${req.params.billID}`);
});

module.exports = billRouter;