const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    surname: { type: String, required: true, uppercase: true },
    dni: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true },
    rol: {type: Schema.Types.ObjectId, ref: 'Roles'},
    active: { type: Boolean, default: true },
    account: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employes', employeSchema);