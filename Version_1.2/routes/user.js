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
const auth = require("../middleware/auth"); // Authentification middleware
const personalDataAccess = require("../middleware/personalDataAccess"); // Personal data access middleware

/* ----- ROUTES ----- */
router.post(
  "/signup",
  createAccountLimiter,
  emailValidator.newAccount,
  passwordValidator,
  userCtrl.signup
); // Create user
router.post("/login", connexionLimiter, userCtrl.login); // Connexion user

router.get("/user/:id", auth, personalDataAccess, userCtrl.getOneUser); // Acces to a user Data

router.post(
  "/user/:id",
  auth,
  personalDataAccess,
  emailValidator.modifyAccount,
  userCtrl.modifyDataUser
); // Modify personal data except the password

router.post("/", userCtrl.auth); // Authentification

/* ROUTE Export */
module.exports = router;
