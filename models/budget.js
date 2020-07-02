const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

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