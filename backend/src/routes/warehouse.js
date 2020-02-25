const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Warehouse = require('../models/warehouses');
const app = express();

// CREAR ALMACEN
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const warehouse = new Warehouse({
        name: body.name,
        description: body.description,
        local: body.local
    });
    warehouse.save((err, warehouseSave) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(warehouseSave);
    });
});

// ACTUALIZAR ALMACEN
app.put('/:id', mdAuth.verificationToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Warehouse.findByIdAndUpdate(id, {
        name: body.name,
        description: body.description,
        local: body.local
    }, (err, warehouseUpdate) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(warehouseUpdate);
    });
});

// LISTAR ALMACENES
app.get('/', mdAuth.verificationToken, (req, res) => {
    Warehouse.find({})
        .populate('local')
        .exec((err, warehousesDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(warehousesDB);
        });
});

app.get('/:idlocal', mdAuth.verificationToken, (req, res) => {
    const idlocal = req.params.idlocal;
    Warehouse.findOne({local: idlocal}, (err, wDB) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(wDB);
    });
}) 

module.exports = app;