/* This file contains the work logic for the users routes */

/* ----- PACKAGES IMPORT ----- */
const dotenv = require("dotenv"); // bcrypt package

/* dotenv configuration */
dotenv.config({ path: ".env" });

/* EXPORT of the object dotenvConfig */
module.exports = dotenvConfig = Object.freeze({
  PORT: parseInt(process.env.PORT),
  DB_USER: String(process.env.DB_USER),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DB_HOST: String(process.env.DB_HOST),
  DB_NAME: String(process.env.DB_NAME),
  SALTROUNDS: parseInt(process.env.SALTROUNDS),
  SECRET_TOKEN: String(process.env.SECRET_TOKEN),
});
