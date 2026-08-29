const express = require("express");

const {
  register,
  login,
  profile,
  updateDonorProfile,
} = require("../controllers/authController.js");

const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.put("/donor-profile", authMiddleware, updateDonorProfile);

module.exports = router;
