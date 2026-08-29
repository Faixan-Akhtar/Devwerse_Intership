const express = require("express");

const router = express.Router();

const {
  createRequest,
  getDonorRequests,
  updateRequestStatus,
} = require("../controllers/bloodRequestController");

const authMiddleware = require("../middleware/authMiddleware");

// Recipient creates request
router.post("/", authMiddleware, createRequest);

// Donor gets their requests
router.get("/donor", authMiddleware, getDonorRequests);

// Donor accepts/rejects request
router.patch("/:id/status", authMiddleware, updateRequestStatus);

module.exports = router;
