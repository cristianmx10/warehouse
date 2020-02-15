const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Product = require('../models/products');
const ProductW = require('../models/productWarehouses');
const app = express();

// CREAR PRODUCTO
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const product = new Product({
        name: body.name,
        description: body.description,
        productCode: body.productCode,
        pricePurchase: body.pricePurchase,
        priceSale: body.priceSale,
        category: body.category
    });
    product.save((err, productSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productSave);
    });
});

// ACTUALIZAR PRODUCTO
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Product.findByIdAndUpdate(id, {
        name: body.name,
        description: body.description,
        productCode: body.productCode,
        pricePurchase: body.pricePurchase,
        priceSale: body.priceSale,
        category: body.category
    }, (err, productUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productUpdate);
    });
});

// DESACTIVAR PRODUCTO
app.delete('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    // SI EL PRODUCTO ESTA RELACIONADO CON UN ALAMACEN NO SE DESACTIVARA
    ProductW.find({ product: id, active: true }, (err, pwDB) => {
        if (err) return res.status(400).json(err);
        if (pwDB.length == 0) {
            Product.findByIdAndUpdate(id, { active: false }, (err, productUpdate) => {
                if (err) return res.status(400).json(err);
                res.status(200).json(productUpdate);
            });
        } else {
            res.status(200).json('NO DESACTIVADO');
        }
    })
});

// LISTAR PRODUCTOS
app.get('/', mdAuth.verificationToken, (req, res) => {
    const valor = req.params.valor;
    Product.find({})
        .sort({ updatedAt: -1 })
        .populate('category')
        .exec((err, productsDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(productsDB);
        });
});

// OBTENER PRODUCTO POR SU CODIGO
app.get('/:code', mdAuth.verificationToken, (req, res) => {
    const code = req.params.code;
    Product.findOne({ productCode: code }, (err, productDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productDB);
    });
});

module.exports = app;