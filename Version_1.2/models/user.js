/* This file contains the user schema, for the MongoDB Atlas database */

/* ----- PACKAGES and FILES IMPORT ----- */
const mongoose = require("mongoose"); // Mongoose package
const uniqueValidator = require("mongoose-unique-validator"); // mongoose-unique-validator package

/* ----- SCHEMA ----- */
const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
});

/* ----- PLUG-IN ----- */
userSchema.plugin(uniqueValidator); // ensures the uniqueness of the desired data (email)

/* ----- EXPORTS ----- */
module.exports = mongoose.model("User", userSchema); // User schema export
