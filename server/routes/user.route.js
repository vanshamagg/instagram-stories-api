// /api/v1/user

const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("welcome to the user route")
})


module.exports =  router;