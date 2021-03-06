const express = require('express');
const mdAuth = require('../middlewares/autentication');
const DeatailSale = require('../models/detailSales');
const app = express();

// CREAR DETALLE DE VENTA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body; // ARRAY DE LOS PRODUCTOS A VENDER
    body.forEach(x => {
        const detailSale = new detailSale({
            product: x.product,
            sale: x.sale,
            quantity: x.quantity,
            discount: x.discount,
            totalPrice: x.totalPrice
        });
        detailSale.save((err, detailSaleSave) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(detailSaleSave);
        });
    });
});

// ACTUALIZAR DETALLE VENTA
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    DeatailSale.findByIdAndUpdate(id, {
        product: body.product,
        sale: body.sale,
        quantity: body.quantity,
        discount: body.discount,
        totalPrice: body.totalPrice
    }, (err, detailSaleUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(detailSaleUpdate);
    });
});

// LISTAR DETALLES VENTA
app.get('/', mdAuth.verificationToken, (req, res) => {
    DeatailSale.find({}, (err, detailSalesDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(detailSalesDB);
    });
});

module.exports = app;