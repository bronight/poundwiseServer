const express = require('express');
const bodyParser = require('body-parser');

const transactionRouter = express.Router();

transactionRouter.use(bodyParser.json());

transactionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the transactions to you.');
})
.post((req, res) => {
    res.end(`Will add the transaction: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /transactions.');
})
.delete((req, res) => {
    res.end('Deleting all transactions');
});

transactionRouter.route('/:transactionID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the transaction ${req.params.transactionID} to you.`);
})
.post((req, res) => {
    res.end(`Will add the transaction: ${req.params.transactionID} with the name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`Will update the transaction ${req.params.transactionID}.`);
})
.delete((req, res) => {
    res.end(`Will delete the transaction: ${req.params.transactionID}`);
});

module.exports = transactionRouter;