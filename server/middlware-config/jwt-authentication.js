/**
 *  Custominzing the express-jwt middleware and exporting it.
 */
const load = require('dotenv').config();
const jwt = require('express-jwt');
if(load.error) throw load.error;
const config =  {
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: getTokenFromCookie
} 

function getTokenFromCookie(req) {
    const token = req.signedCookies.token;
    if(token) return token;
    else throw new Error("Token is either invalid or missing.");
}


function handleError (err, req, res, next) {
    if(err.name) res.status(400).send(err.message);
    else next();
}
const stack =  [jwt(config), handleError];
module.exports = stack;