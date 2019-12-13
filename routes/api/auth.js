// handles obtaining jsonwebtoken for authentication

const express = require("express"); // brings in express
const router = express.Router();
const auth = require("../../middleware/auth"); // protects routes by adding as a param
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  // creates a route
  try {
    const user = await User.findById(req.user.id).select("-password"); // last bit leaves off password in the data
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
