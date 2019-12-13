// handles obtaining jsonwebtoken for authentication

const express = require("express"); // brings in express
const router = express.Router();
const auth = require("../../middleware/auth"); // protects routes by adding as a param
const User = require("../../models/User");
const bcrypt = require("bcryptjs"); // brings in bcryptjs for use in password encryption
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
// requires to express-validator/check are deprecated, so just using express-validator instead
// documentation for express-validator/check - https://express-validator.github.io/docs/

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email address").isEmail(), // ensures valid email address
    check("password", "Password is required").exists(), // ensures a password is entered
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // sent back if errors are triggered (if the above do not match their corresponding validation)
    }

    const { email, password } = req.body; // destructures user details

    try {
      let user = await User.findOne({ email });

      if (!user) {
        // checks if users does not exist and returns error, if not
        // formatted in same way as other error messages
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); // params are the plain text password from the req.body and the encrypted password from the User

      if (!isMatch) {
        // checks if inputted password and user password are equal; returns error, if not
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id, // mongoose abstracts away mongoDB's underscore from "_id"
        },
      };

      jwt.sign(
        payload, // unique user identification
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        // expiration (optional) - change to 3600 (one hour) for deployment
        (err, token) => {
          // either throws error or sends token
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
