// contains routes to do with profiles - fetching, adding, updating, etc.

const express = require("express"); // brings in express
const request = require("request"); // for use with github linking
const config = require("config"); // for access to the github client id and client secret tokens
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// requires to express-validator/check are deprecated, so just using express-validator instead
// documentation for express-validator/check - https://express-validator.github.io/docs/

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    // pertains to the user field in the profile model, which is the object ID of the user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]); // also populates profile with name and avatar

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); // creates a route

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("podrole", "Podcast role is required")
        .not()
        .isEmpty(),
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("title", "Current ritle is required")
        .not()
        .isEmpty(),
      check("interests", "Interests are required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      // pulls everything out from the body
      podrole,
      status,
      title,
      company,
      email,
      website,
      location,
      bio,
      githubusername,
      interests,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {}; // builds profile fields object
    profileFields.user = req.user.id;
    if (podrole) profileFields.podrole = podrole;
    if (status) profileFields.status = status;
    if (company) profileFields.company = company;
    if (title) profileFields.title = title;
    if (email) profileFields.email = email;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (interests) {
      // trims whitespace and converts interests into an array
      profileFields.interests = interests
        .split(",")
        .map(interest => interest.trim());
    }

    profileFields.social = {}; // builds social object
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id }); // finds profile by user

      if (profile) {
        // if profile found, updates
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields); // if profile not found, creates

      await profile.save(); // saves profile
      res.json(profile); // sends back profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile/hosts
// @desc    Get all host profiles
// @access  Private
router.get("/hosts", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      podrole: "Host",
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/search
// @desc    Get filtered host profiles
// @access  Private
router.get("/hosts/:interest", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      interests: { $in: [req.params.interest] },
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/guests
// @desc    Get all guest profiles
// @access  Private
router.get("/guests", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      podrole: "Guest",
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/search
// @desc    Get filtered guest profiles
// @access  Private
router.get("/guests/:interest", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({
      interests: { $in: [req.params.interest] },
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // removes user posts
    await Post.deleteMany({ user: req.user.id });
    // removes profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // removes user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp); // pushes to beginning (most recent is first)

      await profile.save();

      res.json(profile); // returns whole profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    // get profile of user
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // splices out the specified experience
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu); // pushes to beginning (most recent is first)

      await profile.save();

      res.json(profile); // returns whole profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    // get profile of user
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // splices out the specified education
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Private
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
