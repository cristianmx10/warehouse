const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    saleCode: { type: String, default: 'No code' },
    salePrice: { type: Number, required: true },
    totalPaid: { type: Number, required: true },
    efectivo: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sales', saleSchema);