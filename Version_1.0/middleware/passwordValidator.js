/* This file contains the configuration to verify passwords */

/* ----- SCHEMA IMPORT ----- */
const passwordSchema = require("../models/passwordValidator");

/* Checks if the password matches the Schema */
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message:
        "Invalid password: must have between 8 and 24 characters, at least one uppercase letter, one lowercase letter, a number, a special symbol and no spaces!",
    });
  } else {
    next();
  }
};

// const passwordValidity = passwordSchema.validate(req.body.password, { list: true }); // or  { details: true }
// switch (passwordValidity) {
//   case true:
//     console.log(`TRUE : ${passwordValidity}`);
//     break;
//   case false:
//     console.log(`FALSE : ${passwordValidity}`);
//     break;
//   default:
//     console.log(`DEFAULT : ${passwordValidity}`);
// }
