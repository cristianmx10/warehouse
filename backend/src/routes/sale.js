const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Sale = require('../models/sales');
const app = express();

// CREAR VENTA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const sale = new Sale({
        salePrice: body.salePrice,
        totalPrice: body.totalPrice,
        efectivo: body.efectivo
    });
    sale.save((err, saleSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(saleSave);
    });
});

// ACTUALIZAR VENTA
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Sale.findByIdAndUpdate(id, {
        salePrice: body.salePrice,
        totalPrice: body.totalPrice,
        efectivo: body.efectivo,
    }, (err, saleUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(saleUpdate);
    });
});

// LISTAR VENTAS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Sale.find({}, (err, salesDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(salesDB);
    });
});

module.exports = app;