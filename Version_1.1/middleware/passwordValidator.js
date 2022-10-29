/* This file contains the configuration to verify passwords */

/* ----- SCHEMA IMPORT ----- */
const passwordSchema = require("../models/passwordValidator");

/* Checks if the password matches the Schema */
module.exports = (req, res, next) => {
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
};
