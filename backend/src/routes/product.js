const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Product = require('../models/products');
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

// LISTAR PRODUCTOS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Product.find({}, (err, productsDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(productsDB);
    });
});

module.exports = app;