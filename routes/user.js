const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const verify = require("../verifyToken");

// //*checker

// router.get("/", (req, res) => {
//   res.send("Hello");
// });

//*UPDATE
//! add verify between id and async

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Not allowed!!");
  }
});

//*DELETE USER

//! add verify between id and async

router.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      if (user) {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully!!");
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delelte only your account!!");
  }
});

//*Get a user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
