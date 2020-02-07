const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSalesSchema = new Schema({
    producto: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    sale: { type: Schema.Types.ObjectId, ref: 'Sales', required: true },
    quantity: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('DetailSales', detailSalesSchema);