const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Logins', loginSchema);