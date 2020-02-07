const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeLocalSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: 'Locals', required: true },
    employe: { type: Schema.Types.ObjectId, ref: 'Employes', required: true },
    observation: { type: String, default: 'No observation' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('EmployeLocals', employeLocalSchema);