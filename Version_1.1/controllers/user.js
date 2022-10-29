/* This file contains the work logic for the users and authentification routes */

/* ----- PACKAGES and FILES IMPORT ----- */
const bcrypt = require("bcrypt"); // bcrypt package
const User = require("../models/user"); // Models user
const dotenvConfig = require("../config/dotenvConfig"); // Config .env
const jwt = require("jsonwebtoken"); // jsonwebtoken package
const auth = require("../middleware/auth"); // Authentification function

/* EXPORT : Logic for the authentification */
exports.auth = (req, res, next) => {
  auth(req, res);
};

/* EXPORT : Logic for the user creation */
exports.signup = (req, res, next) => {
  bcrypt // Password hash with bcrypt
    .hash(req.body.password, dotenvConfig.SALTROUNDS)
    .then((hash) => {
      // New User creation
      const user = new User({
        ...req.body,
        password: hash,
      });
      // New User registration
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Your account was created !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/* EXPORT : Logic for the user connexion */
exports.login = (req, res, next) => {
  // User search
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Email or password incorrect !" });
      bcrypt // Decoded password
        .compare(req.body.password, user.password)
        .then((passwordValidity) => {
          switch (passwordValidity) {
            // Password not valid
            case false:
              return res
                .status(401)
                .json({ message: "Email or password incorrect !" });
              break;
            // Password valid
            case true:
              res.status(200).json({
                userID: user._id,
                userName: user.name,
                //create the authentication token
                token: jwt.sign(
                  { userID: user._id },
                  dotenvConfig.SECRET_TOKEN,
                  {
                    expiresIn: "24h",
                  }
                ),
              });
              break;
            default:
              res.status(400).json({ error: "Authentification Failed !" });
          }
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/* EXPORT : Logic for the user connexion */
exports.getOneUser = (req, res, next) => {
  switch (req.params.id) {
    case req.auth.userId && req.body.userId:
      User.findOne({ _id: req.params.id })
        .then((user) => {
          if (!user) {
            res.status(404).json({ error: "User not find !" });
          } else {
            user.password = "************";
            res.status(200).json({ user });
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;
    case !req.auth.userId || !req.body.userId:
      res.status(401).json({
        status: 401,
        message: "User unauthorized !",
        error: "Wrong Token, ID or params !",
      });
      break;
    default:
      res.status(401).json({
        status: 401,
        message: "Acces restricted !",
      });
  }
};
