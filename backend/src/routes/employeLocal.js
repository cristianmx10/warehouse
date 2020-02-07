const express = require('express');
const mdAuth = require('../middlewares/autentication');
const EmployeLocal = require('../models/employeLocals');
const app = express();

// CREAR EMPLEADO POR LOCAL
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const employeLocal = new EmployeLocal({
        local: body.local,
        employe: body.employe,
        observation: body.observation
    });
    employeLocal.save((err, employeLocalSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(employeLocalSave);
    });
});

// ACTUALIZAR EMPLEADO POR LOCAL
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    EmployeLocal.findByIdAndUpdate(id, {
        local: body.local,
        employe: body.employe,
        observation: body.observation
    }, (err, employeLocalUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(employeLocalUpdate);
    });
});

// LISTAR
app.get('/', mdAuth.verificationToken, (req, res) => {
    EmployeLocal.find({})
        .populate('local employe')
        .exec((err, employeLocalsDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employeLocalsDB);
        });
});

module.exports = app;
