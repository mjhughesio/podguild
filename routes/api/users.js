// handles registering users, adding users, etc.

const express = require("express"); // brings in express
const router = express.Router();
const { check, validationResult } = require("express-validator/check"); // documentation for express-validator/check - https://express-validator.github.io/docs/

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required") // 2nd param is custom error message
      .not()
      .isEmpty(), // two rules used in conjunction to ensure name input field is not empty
    check("email", "Please include a valid email address").isEmail(), // ensures valid email address
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }), // sets minimum character requirement for password
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // sent back if errors are triggered (if the above do not match their corresponding validation)
    }
    res.send("User route");
  }
);

module.exports = router;
