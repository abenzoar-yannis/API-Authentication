/* This file contains the configuration to verify email */

/* ----- PACKAGES IMPORT ----- */
const emailValidator = require("email-validator");

/* Checks if the email is a email for new account */
exports.newAccount = (req, res, next) => {
  try {
    if (emailValidator.validate(req.body.email)) {
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "Please enter a valid email address !",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error,
    });
  }
};

/* Checks if the email is a email for the modification of an account */
exports.modifyAccount = (req, res, next) => {
  try {
    if (req.body.newDataUser.email) {
      switch (emailValidator.validate(req.body.newDataUser.email)) {
        case true:
          next();
          break;
        case false:
          res.status(400).json({
            status: 400,
            message: "Please enter a valid email address !",
          });
          break;
        default:
          res.status(400).json({
            status: 400,
            message: "Email verification failed !",
          });
      }
    } else next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error,
    });
  }
};
