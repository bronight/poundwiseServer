const express = require('express');
const bodyParser = require('body-parser');
const Transaction = require('../models/transaction');

const transactionRouter = express.Router();

transactionRouter.use(bodyParser.json());

transactionRouter.route('/')
.get((req, res, next) => {
    Transaction.find()
    .then(transactions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transactions);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Transaction.create(req.body)
    .then(transaction => {
        console.log('Transaction Created ', transaction);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transaction);
    })
    .catch(err => next(err));
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