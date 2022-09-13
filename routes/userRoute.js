const express = require("express");
const router = express.Router();
const User=require("../models/userModel");
const bcrypt=require("bcrypt");


router.post("/register", async (req, res) => {
  try {
    //crypter le mot de passe
    const password=req.body.password;
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    req.body.password=hashedPassword;
    const newUser=new User(req.body);
    
    await newUser.save();
    res.status(200).send({message:"user created succefully",success:true});
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
