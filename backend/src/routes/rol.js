const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Rol = require('../models/roles');
const app = express();

// CREAR ROL
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const rol = new Rol({
        codeRol: body.codeRol,
        nameRol: body.nameRol,
        description: body.description,
    });
    rol.save((err, rolSave) => {
        if (err) return res.status(400).json(err);
        res.status(201).json(rolSave);
    });
});

// ACTUALIZAR ROL
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Rol.findByIdAndUpdate(id, {
        codeRol: body.codeRol,
        nameRol: body.nameRol,
        description: body.description
    }, (err, rolUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(rolUpdate);
    });
});

// LISTAR ROLES
app.get('/', mdAuth.verificationToken, (req, res) => {
    Rol.find({}, (err, rolesDB) => {
        if (err) res.status(400).json(err);
        res.status(200).json(rolesDB);
    });
});

module.exports = app;