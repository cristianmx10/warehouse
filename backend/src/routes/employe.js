const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Employe = require('../models/employes');
const app = express();

// CREAR EMPLEADO
app.post('/', (req, res) => {
    const body = req.body;
    const employe = new Employe({
        name: body.name,
        surname: body.surname,
        dni: body.dni,
        rol: body.rol,
        phone: body.phone
    });
    employe.save((err, employeSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(employeSave);
    });
});

// OBTENER EMPLEADO POR DNI
app.get('/:dni', mdAuth.verificationToken, (req, res) => {
    const dni = req.params.dni;
    Employe.findOne({ dni: dni })
        .populate('rol')
        .exec((err, employeDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employeDB);
        });
});

// ACTUALIZAR EMPLEADO
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Employe.findByIdAndUpdate(id, {
        name: body.name,
        surname: body.surname,
        dni: body.dni,
        phone: body.phone,
        rol: body.rol
    }, (err, employeUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(employeUpdate);
    });
});

// LISTAR EMPLEADOS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Employe.find({})
        .populate('rol')
        .exec((err, employesDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employesDB);
        });
});

module.exports = app;