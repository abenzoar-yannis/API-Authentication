/* This file contains the configuration to verify email */

/* ----- PACKAGES IMPORT ----- */
const emailValidator = require("email-validator");

/* Checks if the password matches the Schema */
module.exports = (req, res, next) => {
  if (emailValidator.validate(req.body.email)) {
    next();
  } else {
    res.status(400).json({
      message: "Please enter a valid email address! ",
    });
  }
};
