const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExsist = await User.findOne({ email: req.body.email });
    if (userExsist) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    //crypter le mot de passe
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "user created succefully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let token = "";
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Password is incorrect ", success: false });
    } else {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    }
    if (user && isMatch) {
      res.status(200).send({
        message: "Login successful",
        success: true,

        data: token,
      });
    }
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Error logging in ", success: false, error });
  }
});

router.post("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      return res.status(200).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    return res
      .status(200)
      .send({ message: "Error getting user info", success: false, error });
  }
});

module.exports = router;
