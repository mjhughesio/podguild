// contains routes to do with profiles - fetching, adding, updating, etc.

const express = require("express"); // brings in express
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Profile route")); // creates a route

module.exports = router;
