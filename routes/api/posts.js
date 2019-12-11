// handles forum area - posts, likes, comments, etc.

const express = require("express"); // brings in express
const router = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Posts route")); // creates a route

module.exports = router;
