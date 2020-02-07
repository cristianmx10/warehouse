const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: 'No description' },
    local: { type: Schema.Types.ObjectId, ref: 'Locals', required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Warehouses', warehouseSchema);
