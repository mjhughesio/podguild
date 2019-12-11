// handles registering users, adding users, etc.

const express = require("express"); // brings in express
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  console.log(req.body); // object of data sent to route
  res.send("User route");
});

module.exports = router;
