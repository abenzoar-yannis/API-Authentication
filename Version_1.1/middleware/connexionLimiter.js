/* This file contains the logic for limiting the number of connexion request */

/* ----- PACKAGES IMPORT ----- */
const rateLimit = require("express-rate-limit"); // Express rate limit

const connexionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 connexion requests per `window` (here, per 15 minutes)
  message: "Too many connexion request, please try again after few minutes",
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* EXPORT connexionLimiter middleware */
module.exports = connexionLimiter;
