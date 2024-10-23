const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Registration route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({ error: "Failed to register" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    res.status(500).json({ error: "Failed to login" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = router;
