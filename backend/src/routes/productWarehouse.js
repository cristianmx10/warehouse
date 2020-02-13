const express = require('express');
const mdAuth = require('../middlewares/autentication');
const ProductWarehouse = require('../models/productWarehouses');
const app = express();

// CREAR PRODUCTOS POR ALMACEN
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const quantityTotal = 0;
    const productWarehouse = new ProductWarehouse({
        warehouse: body.warehouse,
        product: body.product,
        quantity: body.quantity
    });
    ProductWarehouse.findOne({ product: body.product }, (err, result) => {
        if (err) return res.status(400).json(err);
        if (!result) {
            console.log('aqui');
            
            productWarehouse.save((err, productWarehouseSave) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(productWarehouseSave);
            });
        } else {
            // quantityTotal = result.quantity + body.quantity;
            console.log(parseInt(result.quantity) + parseInt(body.quantity));
            // cambiar por producto u otro metod
            ProductWarehouse.findByIdAndUpdate(body.warehouse, {
                quantity: parseInt(result.quantity) + parseInt(body.quantity)
            }, (err, resultU) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(resultU);
            })
        }
    })
});

// ACTUALIZAR PRODUCTOS POR ALMACEN
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    ProductWarehouse.findByIdAndUpdate(id, {
        warehouse: body.warehouse,
        product: body.product,
        quantity: body.quantity
    }, (err, productWarehouseUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productWarehouseUpdate);
    });
});

// LISTAR PRODUCTOS POR ALMACEN
app.get('/', mdAuth.verificationToken, (req, res) => {
    ProductWarehouse.find({})
        .sort({ createdAt: -1 })
        .populate('product warehouse')
        .exec((err, productWarehousesDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(productWarehousesDB);
        });
});

module.exports = app;