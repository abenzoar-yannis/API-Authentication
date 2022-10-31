/* This file contains the logic for verify user access to personal data */

module.exports = (req, res, next) => {
  switch (req.params.id) {
    case req.auth.userId && req.body.userId:
      next();
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
