/* This file contains the user route logic. */

/* ----- PACKAGES and FILES IMPORT ----- */
const express = require("express"); // Express package
const router = express.Router(); // Express Router

/* ----- CONTROLLERS IMPORT ----- */
const userCtrl = require("../controllers/user"); // User controlleur

/* ----- MIDDLEWARE IMPORT ----- */
const passwordValidator = require("../middleware/passwordValidator"); // Middleware for password-validator
const emailValidator = require("../middleware/emailValidator"); // Middleware for email-validator
const connexionLimiter = require("../middleware/connexionLimiter"); // Middleware for connexionLimiter
const createAccountLimiter = require("../middleware/createAccountLimiter"); // Middleware for createAccountLimiter

/* ----- ROUTES ----- */
router.post(
  "/signup",
  createAccountLimiter,
  emailValidator,
  passwordValidator,
  userCtrl.signup
); // Create user
router.post("/login", connexionLimiter, userCtrl.login); // Connexion user

/* ROUTE Export */
module.exports = router;
