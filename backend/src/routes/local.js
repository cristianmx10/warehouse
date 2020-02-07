const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Local = require('../models/locals');
const app = express();

// CREAR LOCAL
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const local = new Local({
        name: body.name,
        description: body.description,
        location: body.location
    });
    local.save((err, localSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(localSave);
    });
});

// ACTUALIZAR LOCAL
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Local.findByIdAndUpdate(id, {
        name: body.name,
        description: body.description,
        location: body.location
    }, (err, localUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(localUpdate);
    });
});

// LISTAR LOCALES
app.get('/', mdAuth.verificationToken, (req, res) => {
    Local.find({}, (err, localsDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(localsDB);
    });
});

module.exports = app;