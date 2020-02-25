const express = require('express');
const mdAuth = require('../middlewares/autentication');
const Sale = require('../models/sales');
const app = express();

// CREAR VENTA
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    console.log(body);
    
    const codeSale = createdate();
    const sale = new Sale({
        saleCode: codeSale,
        salePrice: body.salePrice,
        totalPaid: body.totalPaid,
        turned: body.turned,
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

function createdate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const code = `${year}${month}${day}${hour}${minutes}${seconds}-${milliseconds}`;
    return code;
}

module.exports = app;