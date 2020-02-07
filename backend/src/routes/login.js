const express = require('express');
const mdAuth = require('../middlewares/autentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/logins');
const Employe = require('../models/employes');
const app = express();

// CREAR LOGIN
app.post('/', mdAuth.verificationToken, (req, res) => {
    const body = req.body;
    const login = new Login({
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        employe: body.employe
    });
    login.save((err, loginSave) => {
        if (err) return res.status(400).json(err);
        Employe.findByIdAndUpdate(body.employe, { account: true }, (err, employeUpdate) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(employeUpdate);
        });
    });
});

// LOGIN
app.post('/singin', (req, res) => {
    const body = req.body;
    Login.findOne({ username: body.username }, (err, loginDB) => {
        if (err) return res.status(400).json(err);
        if (!loginDB) return res.status(404).json('Not found');
        if (!bcrypt.compareSync(body.password, loginDB.password)) {
            return res.status(400).json('Credenciales incorrectas');
        }
        Employe.findById(loginDB.employe, (err, employeDB) => {
            if (err) return res.status(400).json(err);
            if (!employeDB) return res.status(404).json('Not found');
            token = jwt.sign({ user: employeDB }, process.env.SEED, { expiresIn: 86400 });
            res.status(200).json(token);
        });
    });
});

// LISTAR LOGINS
app.get('/', mdAuth.verificationToken, (req, res) => {
    Login.find({})
        .populate('employe')
        .populate({
            path: 'employe',
            populate: { path: 'rol'}
        })
        .exec((err, loginsDB) => {
            if (err) return res.status(400).json(err);
            res.status(200).json(loginsDB);
        });
});

module.exports = app;