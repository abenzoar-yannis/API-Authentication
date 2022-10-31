/* This file contains the logic for limiting account creation request */

/* ----- PACKAGES IMPORT ----- */
const rateLimit = require("express-rate-limit"); // Express rate limit

const createAccountLimiter = rateLimit({
  windowMs: 4 * 60 * 60 * 1000, // 4 hour
  max: 3, // Limit each IP to 3 create account requests per `window` (here, per 4 hour)
  message: "Too many accounts created, please try again after few hour",
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = createAccountLimiter;
