const express = require('express');
const bodyParser = require('body-parser');
const Investment = require('../models/investment');
const authenticate = require('../authenticate');
const cors = require('./cors');

const investmentRouter = express.Router();

investmentRouter.use(bodyParser.json());

investmentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Investment.find()
    .then(investments => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(investments);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Investment.create(req.body)
    .then(investment => {
        console.log('Investment Created ', investment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(investment);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported on /investments.');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Investment.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

investmentRouter.route('/:investmentId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log(req.params.investmentId);
    Investment.findById(req.params.investmentId)
    .then(investment => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(investment);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /investments/${req.params.investmentId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Investment.findByIdAndUpdate(req.params.investmentId, {
        $set: req.body
    }, { new: true })
    .then(investment => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(investment);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Investment.findByIdAndDelete(req.params.investmentId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = investmentRouter;