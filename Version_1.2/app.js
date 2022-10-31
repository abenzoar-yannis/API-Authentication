/* This file contains the creation of the Express application,
the connection to the database, and the configuration of the CORS */

/* ----- PACKAGES and FILES IMPORT ----- */
const express = require("express"); // Express package
const mongoose = require("mongoose"); // Mongoose package
const dotenvConfig = require("./config/dotenvConfig"); // Config .env

/* --- Express Application --- */
const app = express();

/* --- ROUTES IMPORT --- */
const userRoutes = require("./routes/user");

/* ----- MIDDLEWARE ----- */
app.use(express.json()); // Interpretation of the request body

/* ----- DATABASE ----- */
mongoose // MongoDB Atlas
  .connect(
    `mongodb+srv://${dotenvConfig.DB_USER}:${dotenvConfig.DB_PASSWORD}@${dotenvConfig.DB_HOST}/${dotenvConfig.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Successful connection to MongoDB !"))
  .catch(() => console.log("Connection to MongoDB failed !"));

/* ----- CORS ----- */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* ----- ROUTES ----- */
app.use("/api/auth", userRoutes);

/* ----- EXPORTS ----- */
module.exports = app; // Express Application EXPORT
