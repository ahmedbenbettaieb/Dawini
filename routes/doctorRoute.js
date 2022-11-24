const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor info fetched successfully",
      data: doctor
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {userId:req.body.userId},req.body
    );
    res.status(200).send({
      success: true,
      message: "doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});
module.exports = router;
