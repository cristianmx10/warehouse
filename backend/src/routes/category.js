const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Category = require('../models/categories');
const app = express();

// CREAR CATEGORIA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const category = new Category({
        name: body.name,
        description: body.description
    });
    category.save((err, categorySave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categorySave);
    });
});

// ACTUALIZAR CATEGORIA
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Category.findByIdAndUpdate(id, {
        name: body.name,
        description: body.description
    }, (err, categoryUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categoryUpdate);
    });
});

// LISTAR CATEGORYAS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Category.find({}, (err, categoriesDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(categoriesDB);
    });
});

module.exports = app;