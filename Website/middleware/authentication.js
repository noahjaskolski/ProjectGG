const jwt = require('jsonwebtoken');
require('dotenv/config');
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET;


const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, `${JWT_SECRET}`, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/');
    }
}

module.exports = { authenticate };