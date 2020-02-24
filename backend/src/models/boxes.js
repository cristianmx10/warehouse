const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: 'Locals', required: true },
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    startingPrice: { type: Number, required: true },
    endPrice: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    obsrvation: { type: String, default: 'No observation' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Boxes', boxSchema);