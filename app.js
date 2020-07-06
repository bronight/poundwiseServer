const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const overviewRouter = require('./routes/overviewRouter');
const transactionRouter = require('./routes/transactionRouter');
const billRouter = require('./routes/billRouter');
const budgetRouter = require('./routes/budgetRouter');
const goalRouter = require('./routes/goalRouter');
const investmentRouter = require('./routes/investmentRouter');

const hostname = 'localhost';
const port = 3000;

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/poundwiseServer';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/overview', overviewRouter);
app.use('/transactions', transactionRouter);
app.use('/bills', billRouter);
app.use('/budgets', budgetRouter);
app.use('/goals', goalRouter);
app.use('/investments', investmentRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;