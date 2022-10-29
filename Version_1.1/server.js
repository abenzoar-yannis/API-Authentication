/* This file contains port normalization, error handling and
Node server connection logic */

/* ----- PACKAGES and FILES IMPORT ----- */
const http = require("http"); // Node 'http' package
const app = require("./app"); // Express application file
const dotenvConfig = require("./config/dotenvConfig"); // Config .env

/* Return a valid PORT Whether transmitted in numbers or in string */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/* ----- PORT ----- */
const port = normalizePort(dotenvConfig.PORT || "3000");
app.set("port", port);

/* errorHandler checks for errors and logs them to the server */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* ----- SERVER CREATION ----- */
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

/* ----- LISTENING ----- */
server.listen(port);
