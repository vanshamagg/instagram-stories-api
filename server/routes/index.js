const express = require("express");
const router = express.Router();

router.use('/user', require('./user.route'));

// HOME MESSAGE
router.get('/', (req, res)=> {
    const message = "<h1 align = 'center'> Yes it Works! Welcome to Instagram API </h1>";
    res.send(message);
})


module.exports = router;