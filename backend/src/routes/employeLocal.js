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
    // No puede haber el mismo empleado dos veces en un local
    EmployeLocal.find({ local: body.local, employe: body.employe }, (err, emplDB) => {
        if (err) return res.status(400).json(err);
        if (emplDB.length == 0) {
            employeLocal.save((err, employeLocalSave) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(employeLocalSave);
            });
        } else {
            res.status(200).json('error');
        }
    })
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

// LISTAR POR ID EMPLEADO
app.get('/byemploye/:idEmploye', mdAuth.verificationToken, (req, res) => {
    const idEmploye = req.params.idEmploye;
    EmployeLocal.find({ employe: idEmploye })
        .populate('local employe')
        .exec((err, employeLocalsDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employeLocalsDB);
        });
});

// lISTAR EMPLEADOS POR LOCAL
app.get('/:idlocal', mdAuth.verificationToken, (req, res) => {
    const idlocal = req.params.idlocal;
    EmployeLocal.find({ local: idlocal })
        .populate('employe')
        .exec((err, employeLDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employeLDB);
        });
});

module.exports = app;
