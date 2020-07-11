const express = require('express');
const bodyParser = require('body-parser');
const Bill = require('../models/bill');
const authenticate = require('../authenticate');
const cors = require('./cors');

const billRouter = express.Router();

billRouter.use(bodyParser.json());

billRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Bill.find()
    .then(bills => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bills);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bill.create(req.body)
    .then(bill => {
        console.log('Bill Created ', bill);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bill);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported on /bills.');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bill.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

billRouter.route('/:billId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log(req.params.billId);
    Bill.findById(req.params.billId)
    .then(bill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bill);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /bills/${req.params.billId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bill.findByIdAndUpdate(req.params.billId, {
        $set: req.body
    }, { new: true })
    .then(bill => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bill);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bill.findByIdAndDelete(req.params.billId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = billRouter;