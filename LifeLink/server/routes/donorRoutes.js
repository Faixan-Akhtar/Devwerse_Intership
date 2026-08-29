const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDonorById,
  getMyDonorProfile,
  searchDonors,
  updateDonorProfile,
} = require("../controllers/donorController");

// ===============SEARCH DONORS=========

router.get("/search", searchDonors);

// ==============LOGGED-IN DONOR PROFILE=========

router.get("/me", authMiddleware, getMyDonorProfile);

// =======SINGLE DONOR PROFILE========

router.get("/:id", authMiddleware, getDonorById);

// ======UPDATE DONOR PROFILE=========

router.put("/profile", authMiddleware, updateDonorProfile);

module.exports = router;
