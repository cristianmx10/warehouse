const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Box = require('../models/boxes');
const app = express();

// CREAR CAJA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const box = new Box({
        local: body.local,
        startingPrice: body.startingPrice,
        observation: body.observation
    });
    box.save((err, boxSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(boxSave);
    });
});

// ACTUALIZAR CAJA
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Box.findByIdAndUpdate(id, {
        local: body.local,
        entryPrice: body.entryPrice,
        startingPrice: body.startingPrice,
        observation: body.observation
    }, (err, boxUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(boxUpdate);
    });
});

// LISTAR CAJAS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Box.find({}, (err, boxesDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(boxesDB);
    });
});

module.exports = app;