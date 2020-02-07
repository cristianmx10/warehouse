const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, default: 'No description' },
    productCode: { type: String, required: true, trim: true },
    pricePurchase: { type: Number, required: true },
    priceSale: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Categories', required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', productSchema);