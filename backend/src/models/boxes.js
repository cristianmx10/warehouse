const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: 'Locals', required: true },
    entryPrice: { type: Number, default: 0 },
    startingPrice: { type: Number, required: true },
    active: { type: Boolean, default: true },
    obsrvation: { type: String, default: 'No observation' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Boxes', boxSchema);