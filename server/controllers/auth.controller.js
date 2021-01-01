

function giveToken(req, res, next) {
    res.cookie('username', req.user.username,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    res.cookie('name', req.user.firstname + " " +  req.user.lastname,  {httpOnly: true, sameSite: true, signed: true, path: "/api/v1"})
    res.send('Nicely done! You are In.')   
}

const controllers = {};
controllers.giveToken = giveToken;
module.exports = controllers;