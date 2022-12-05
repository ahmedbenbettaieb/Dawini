const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
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
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isDoctor: user.isDoctor,
          seenNotifications: user.seenNotifications,
          unseenNotifications: user.unseenNotifications,
        },
      });
    }
    console.log(id);
  } catch (error) {
    return res
      .status(200)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    firstName = newDoctor.firstName;
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `  ${firstName}  ${newDoctor.lastName} has applied for a  doctor account  `,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error Applying doctor account",
      success: false,
      error,
    });
  }
});
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications=user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications=seenNotifications;
      const updatedUser =  await user.save()
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications are marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error Applying doctor account",
        success: false,
        error,
      });
    }
  }
);
router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await User.findByIdAndUpdate(user._id, user);
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications are deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error deleting",
      success: false,
      error,
    });
  }
});

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({status:"approved"});
    return res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error ",
      success: false,
      error,
    });
  }
});

module.exports = router;
