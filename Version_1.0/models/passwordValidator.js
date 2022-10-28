/* This file contains the password model. */

/* ----- PACKAGES IMPORT ----- */
const passwordValidator = require("password-validator");

/* ----- SCHEMA ----- */
const passwordSchema = new passwordValidator(); // Schema creation
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(24) // Maximum length 24
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .symbols() // Must have symbols
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf([]); // Blacklist these values

module.exports = passwordSchema;
