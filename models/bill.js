const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Currency,
        required: true,
        min: 0
    },
    dueDate: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;