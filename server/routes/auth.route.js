const express = require("express");
const router = express.Router();
const controllers = require('../controllers/auth.controller');
// const passport = require("passport");
const passport = require('../middlware-config/passport');
const flash = require('connect-flash');

// MIDDLEWARE
router.use(passport.initialize());
router.use(flash());

router.post("/", passport.authenticate("local", { session: false, failureMessage: true}), controllers.giveToken);


module.exports = router;
