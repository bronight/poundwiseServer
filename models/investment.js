const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;