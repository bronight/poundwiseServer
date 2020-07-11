const express = require('express');
const bodyParser = require('body-parser');
const Budget = require('../models/budget');
const authenticate = require('../authenticate');
const cors = require('./cors');

const budgetRouter = express.Router();

budgetRouter.use(bodyParser.json());

budgetRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Budget.find()
    .then(budgets => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(budgets);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Budget.create(req.body)
    .then(budget => {
        console.log('Budget Created ', budget);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(budget);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not supported on /budgets.');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Budget.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

budgetRouter.route('/:budgetId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log(req.params.budgetId);
    Budget.findById(req.params.budgetId)
    .then(budget => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(budget);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /budgets/${req.params.budgetId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Budget.findByIdAndUpdate(req.params.budgetId, {
        $set: req.body
    }, { new: true })
    .then(budget => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(budget);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Budget.findByIdAndDelete(req.params.budgetId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = budgetRouter;