const express = require('express');
const bodyParser = require('body-parser');

const budgetRouter = express.Router();

budgetRouter.use(bodyParser.json());

budgetRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the budgets to you.');
})
.post((req, res) => {
    res.end(`Will add the budget: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /budgets.');
})
.delete((req, res) => {
    res.end('Deleting all budgets');
});

budgetRouter.route('/:budgetID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the budget ${req.params.budgetID} to you.`);
})
.post((req, res) => {
    res.end(`Will add the budget: ${req.params.budgetID} with the name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`Will update the budget ${req.params.budgetID}.`);
})
.delete((req, res) => {
    res.end(`Will delete the budget: ${req.params.budgetID}`);
});

module.exports = budgetRouter;