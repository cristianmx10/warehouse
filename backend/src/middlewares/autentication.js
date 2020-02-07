const jwt = require('jsonwebtoken');

exports.verificationToken = (req, res, next) => {
    const token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) return res.status(400).json(err);
        req.user = decoded.user;
        next();
    });
}