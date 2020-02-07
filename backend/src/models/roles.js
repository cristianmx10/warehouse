const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolSchema = new Schema({
    codeRol: { type: String, required: true, unique: true },
    nameRol: { type: String, required: true, uppercase: true },
    description: { type: String, default: 'No description' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Roles', rolSchema);