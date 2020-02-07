const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, default: 'No description' },
    location: { type: String, default: 'No location' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Locals', localSchema);