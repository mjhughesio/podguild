const jwt = require("jsonwebtoken");
const config = require("config");

// exports middleware function
module.exports = function(req, res, next) {
  const token = req.header("x-auth-token"); // get token from the header

  if (!token) {
    // action, if no token found
    return res
      .status(401)
      .json({ msg: "No token found, authorization denied." });
  }

  try {
    // verifies token
    const decoded = jwt.verify(token, config.get("jwtSecret")); // decodes token
    req.user = decoded.user; // sets req.user to user that's inside the decoded token - able to use in any of our protected routes
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
