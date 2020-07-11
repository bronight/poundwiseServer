const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
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
    carryover: {
        type: Boolean,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;