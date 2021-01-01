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

// HOME MESSAGE
router.get("/", (req, res) => {
    const message = "<h1 align = 'center'> Yes it Works! Welcome to Instagram API </h1>";
    res.send(message);
});

module.exports = router;
