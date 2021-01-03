/**
 *  /api/v1/
 */

const load = require("dotenv").config();
if (load.error) throw load.error;

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser(process.env.COOKIE_SECRET));

// ROUTERS
router.use("/user", require("./user.route"));
router.use("/auth", require("./auth.route"));
router.use("/story", require("./story.route"));

// HOME MESSAGE
router.get("/", (req, res) => {
    try {
        // const jwt = require('jsonwebtoken');
        // const decoded = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET);
        // console.log(decoded);
        const message = "<h1 align = 'center'> Yes it Works! Welcome to Instagram API </h1>";
        res.send(message);
    } catch (error) {
        res.send(error.message);
    }
});


module.exports = router;
