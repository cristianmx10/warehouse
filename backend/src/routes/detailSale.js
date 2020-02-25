const express = require('express');
const mdAuth = require('../middlewares/autentication');

const DeatailSale = require('../models/detailSales');
const ProducW = require('../models/productWarehouses');

const app = express();

// CREAR DETALLE DE VENTA
app.post('/:sale/:idw', mdAuth.verificationToken, (req, res) => {
    const sale = req.params.sale;
    const idw = req.params.idw;
    const body = req.body; // ARRAY DE LOS PRODUCTOS A VENDER

    body.forEach(x => {
        const detailSale = new DeatailSale({
            producto: x.producto,
            sale: sale,
            quantity: x.quantity,
            discount: x.discount,
            totalPrice: x.totalPrice
        });
        detailSale.save((err, detailSaleSave) => {
            if (err) return res.status(400).json(err);
            ProducW.findOne({ product: x.producto, warehouse: idw }, (err, pw) => {
                if (err) return res.status(400).json(err);
                ProducW.findOneAndUpdate({ product: x.producto, warehouse: idw }, { quantity: pw.quantity - x.quantity }, (err, pwDb) => {
                    if (err) return res.status(400).json(err);
                });
            });
        });
    });
    res.status(200).json('creado');
});

// ACTUALIZAR DETALLE VENTA
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    DeatailSale.findByIdAndUpdate(id, {
        producto: body.producto,
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