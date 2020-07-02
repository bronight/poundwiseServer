const express = require('express');
const bodyParser = require('body-parser');

const goalRouter = express.Router();

goalRouter.use(bodyParser.json());

goalRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the goals to you.');
})
.post((req, res) => {
    res.end(`Will add the goal: ${req.body.name} with the description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT not supported on /goals.');
})
.delete((req, res) => {
    res.end('Deleting all goals');
});

goalRouter.route('/:goalID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the goal ${req.params.goalID} to you.`);
})
.post((req, res) => {
    res.end(`Will add the goal: ${req.params.goalID} with the name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res) => {
    res.end(`Will update the goal ${req.params.goalID}.`);
})
.delete((req, res) => {
    res.end(`Will delete the goal: ${req.params.goalID}`);
});

module.exports = goalRouter;