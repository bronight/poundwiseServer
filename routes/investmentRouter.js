const express = require('express');
const bodyParser = require('body-parser');

const investmentRouter = express.Router();

investmentRouter.use(bodyParser.json());

investmentRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the investments to you.');
})
.post((req, res) => {
    res.end(`Will add the investment: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /investments.');
})
.delete((req, res) => {
    res.end('Deleting all investments');
});

investmentRouter.route('/:investmentID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the investment ${req.params.investmentID} to you.`);
})
.post((req, res) => {
    res.end(`Will add the investment: ${req.params.investmentID} with the name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`Will update the investment ${req.params.investmentID}.`);
})
.delete((req, res) => {
    res.end(`Will delete the investment: ${req.params.investmentID}`);
});

module.exports = investmentRouter;