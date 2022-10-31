/* This file contains the configuration to verify passwords */

/* ----- SCHEMA IMPORT ----- */
const passwordSchema = require("../models/passwordValidator");

/* Checks if the password matches the Schema, for new account */
exports.newAccount = (req, res, next) => {
  try {
    if (passwordSchema.validate(req.body.password)) {
      next();
    } else {
      const missingList = passwordSchema.validate(req.body.password, {
        list: true,
      });
      res.status(400).json({
        message:
          "Invalid password: must have between 8 and 24 characters, at least one uppercase letter, one lowercase letter, a digit, a special symbol and no spaces!",
        missing: missingList,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error,
    });
  }
};

/* Checks if the password matches the Schema, for the modification of an account */
exports.modifyAccount = (req, res, next) => {
  try {
    if (passwordSchema.validate(req.body.newDataUser.password)) {
      next();
    } else {
      const missingList = passwordSchema.validate(req.body.password, {
        list: true,
      });
      res.status(400).json({
        message:
          "Invalid password: must have between 8 and 24 characters, at least one uppercase letter, one lowercase letter, a digit, a special symbol and no spaces!",
        missing: missingList,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error,
    });
  }
};
