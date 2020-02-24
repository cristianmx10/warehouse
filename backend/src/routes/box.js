const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Box = require('../models/boxes');
const app = express();

// CREAR CAJA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const box = new Box({
        local: body.local,
        employe: body.employe,
        startingPrice: body.startingPrice,
        endPrice: body.endPrice,
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
        startingPrice: body.startingPrice,
        endPrice: body.endPrice,
        observation: body.observation,
        active: body.active
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

// OBTENER ULTIMA CAJA ABIERTA
app.get('/:idemploye', mdAuth.verificationToken, (req, res) => {
    const idemploye = req.params.idemploye;
    Box.findOne({ employe: idemploye })
        .sort({updatedAt: -1})
        .populate('local')
        .exec((err, lastBox) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(lastBox);
        });
});

module.exports = app;