// handles obtaining jsonwebtoken for authentication

const express = require("express"); // brings in express
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Auth route")); // creates a route

module.exports = router;
