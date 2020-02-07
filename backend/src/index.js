const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
require('dotenv').config()

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const warehouseRoutes = require('./routes/warehouse');
const saleRoutes = require('./routes/sale');
const rolRoutes = require('./routes/rol');
const productWarehouseRoutes = require('./routes/productWarehouse');
const productRoutes = require('./routes/product');
const localRoutes = require('./routes/local');
const employeLocalRoutes = require('./routes/employeLocal');
const employeRoutes = require('./routes/employe');
const detailSaleRoutes = require('./routes/detailSale');
const categoryRoutes = require('./routes/category');
const boxRoutes = require('./routes/box');
const loginRoutes = require('./routes/login');

mongoose.connection.openUri(process.env.MONGO_DB_CONECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (err) throw err;
        console.log('Base de datos: online');
    });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

server.use('/warehouse', warehouseRoutes);
server.use('/sale', saleRoutes);
server.use('/rol', rolRoutes);
server.use('/productwarehouse', productWarehouseRoutes);
server.use('/product', productRoutes);
server.use('/local', localRoutes);
server.use('/employelocal', employeLocalRoutes);
server.use('/employe', employeRoutes);
server.use('/detailsale', detailSaleRoutes);
server.use('/category', categoryRoutes);
server.use('/box', boxRoutes);
server.use('/login', loginRoutes);

server.listen(parseInt(process.env.PORT) || 8080, () => {
    console.log('Express server: \x1b[32m%s\x1b[0m', 'online');
});