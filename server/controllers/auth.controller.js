const load = require('dotenv').config();
if(load.error) throw load.error;
const jwt = require('jsonwebtoken');

function giveToken(req, res, next) {
    
    const payload = {
        username: req.user.username,
        name: req.user.firstname + " " + req.user.lastname,
        id: req.user.id
    }
    const encoded = jwt.sign(payload, process.env.JWT_SECRET)
    res.cookie('username', req.user.username,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    res.cookie('name', req.user.firstname + " " +  req.user.lastname,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    res.cookie('id', req.user.id,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    res.cookie('token', encoded,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    
    res.send('Nicely done! You are In.')   
    
}

const controllers = {};
controllers.giveToken = giveToken;
module.exports = controllers;