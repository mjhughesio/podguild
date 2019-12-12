// handles registering users, adding users, etc.

const express = require("express"); // brings in express
const router = express.Router();
const gravatar = require("gravatar");
// brings in gravatar for use with profile icons
// documentation for gravatar - https://en.gravatar.com/site/implement/images/
const { check, validationResult } = require("express-validator");
// requires to express-validator/check are deprecated, so just using express-validator instead
// documentation for express-validator/check - https://express-validator.github.io/docs/

const User = require("../../models/User");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // sent back if errors are triggered (if the above do not match their corresponding validation)
    }

    const { name, email, password } = req.body; // destructures user details

    try {
      let user = await User.findOne({ email });

      if (user) {
        // checks if users exists and returns error, if so
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200", // size in pixels
        r: "pg", // rating parameter - specified image appropriateness
        d: "mm", // default icon (alt: "retro", "robohash", etc.) - if not already set
      });

      user = new User({
        // creates new instance of a user - not yet saved
        name,
        email,
        avatar,
        password, // not yet hashed or encrypted
      });

      res.send("User route");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
