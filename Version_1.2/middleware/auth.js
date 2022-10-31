/* This file contains the logic for verifying the user authentication token, before sending a request */

/* ----- PACKAGES and FILES IMPORT ----- */
const dotenvConfig = require("../config/dotenvConfig"); // Config .env
const jwt = require("jsonwebtoken"); // jsonwebtoken package

module.exports = (req, res, next) => {
  if (!req.headers.authorization || !req.body.userId) {
    res.status(400).json({
      status: 400,
      authentification: false,
      message: "User unauthenticated !",
      error: "User ID or Bearer Token not received",
    });
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, dotenvConfig.SECRET_TOKEN, (error, decoded) => {
        req.auth = { userId: decoded.userID };

        switch (req.auth.userId) {
          case req.body.userId:
            if (!next) {
              res.status(200).json({
                status: 200,
                authentification: true,
                message: "User authentified !",
              });
            } else next();
            break;
          case !req.body.userId:
            res.status(401).json({
              status: 401,
              authentification: false,
              message: "User unauthorized !",
            });
            break;
          default:
            res.status(401).json({
              status: 401,
              authentification: false,
              message: "User unauthenticated !",
              error: error,
            });
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        authentification: false,
        message: "User unauthenticated !",
        error: "Authentification failed !",
      });
    }
  }
};
