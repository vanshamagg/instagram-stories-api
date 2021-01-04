const express = require("express");
const router = express.Router();
const controllers = require('../controllers/auth.controller');
// const passport = require("passport");
const passport = require('../middlware-config/passport');
const {validateSigninRequest,isRequestValidated}=require('../validator/user')

// MIDDLEWARE
router.use(passport.initialize());


router.post("/",validateSigninRequest,isRequestValidated,passport.authenticate("local", { session: false, failureMessage: true}),  controllers.giveToken);

module.exports = router;
