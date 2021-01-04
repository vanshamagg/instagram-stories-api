const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("username").notEmpty().withMessage("username  is required"),

  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 character long"),
];

exports.validateSigninRequest = [
  check("username").notEmpty().withMessage("Valid username is required"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};