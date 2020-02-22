const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: 'Locals', required: true },
    startingPrice: { type: Number, required: true },
    active: { type: Boolean, default: true },
    obsrvation: { type: String, default: 'No observation' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Boxes', boxSchema);