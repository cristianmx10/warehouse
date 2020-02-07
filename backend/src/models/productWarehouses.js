const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productWarehouseSchema = new Schema({
    warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouses', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductWarehouses', productWarehouseSchema);