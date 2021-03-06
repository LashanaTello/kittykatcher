const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateBioInput = require("../../validation/bio");
const validateChangeEmailInput = require("../../validation/settings-email");
const validateChangePasswordInput = require("../../validation/settings-password");
const validateChangeUsernameInput = require("../../validation/settings-username");


// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Invalid credentials" }); /*remember to change this*/
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Invalid credentials" }); /*remember to change this*/
      }
    });
  });
});

router.get("/avatars", (req, res) => {
  User.find({}, "username avatar", (err, allUsersAndAvatars) => {
    if (err) {
      res.send("Something went wrong");
      next();
    }
    res.json(allUsersAndAvatars)
  });
});

// edit bio of specific user
router.put("/bio", (req, res) => {
  const { errors, isValid } = validateBioInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOneAndUpdate({ username: req.body.username }, { bio: req.body.bio }, { new: true, fields: '-_id username bio' }).then(user => {
    if (!user) {
      return res.status(404).json({ usernotfound: "Invalid credentials" });
    }

    res.status(200).json(user);
  });
});

// get bio of user
router.get("/bio/:username", (req, res) => {
  User.findOne({ username: req.params.username }, "bio -_id", (err, bio) => {
    if (err) {
      res.send("Something went wrong");
      next();
    }
    res.status(200).json(bio)
  });
});

// get email of user
router.get("/email/:username", (req, res) => {
  User.findOne({ username: req.params.username }, "email -_id", (err, email) => {
    if (err) {
      res.send("Something went wrong");
      next();
    }
    res.status(200).json(email)
  });
});

// change username of user
router.put("/new-username", (req, res) => {
  const { errors, isValid } = validateChangeUsernameInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOneAndUpdate({ email: req.body.email }, { username: req.body.newUsername }, { new: true, fields: '-_id username' }).then(user => {
    if (!user) {
      return res.status(404).json({ usernotfound: "Invalid credentials" });
    }

    res.status(200).json(user);
  });
});

// change email of user
router.put("/new-email", (req, res) => {
  const { errors, isValid } = validateChangeEmailInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOneAndUpdate({ email: req.body.email }, { email: req.body.newEmail }, { new: true, fields: '-_id email' }).then(user => {
    if (!user) {
      return res.status(404).json({ usernotfound: "Invalid credentials" });
    }

    res.status(200).json(user);
  });
});

// change password of user
router.put("/new-password", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateChangePasswordInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Invalid credentials" }); /*remember to change this*/
    }

    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        next()
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Invalid credentials" }); /*remember to change this*/
      }
    });
  });
}, (req, res) => {
  var theNewPassword = req.body.newPassword;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(theNewPassword, salt, (err, hash) => {
      if (err) throw err;
      theNewPassword = hash;

      //  store new password in db
      User.findOneAndUpdate({ email: req.body.email }, { password: theNewPassword }, { new: true }).then(user => {
        if (!user) {
          return res.status(404).json({ emailnotfound: "Invalid credentials" });
        }

        res.status(200).json(user);
      });
    });
  });
});

module.exports = router;
