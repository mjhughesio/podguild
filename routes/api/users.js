// handles registering users, adding users, etc.

const express = require("express"); // brings in express
const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("User route")); // creates a route

module.exports = router;
