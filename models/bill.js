const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

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