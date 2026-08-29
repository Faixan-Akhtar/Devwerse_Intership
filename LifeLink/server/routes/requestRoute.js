const express = require("express");

const {
  createRequest,
  getAllRequests,
  getMyRequests,
  findMatchingDonors,
  updateRequestStatus,
} = require("../controllers/requestController.js");

const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();

// ======= RECIPIENT CREATES REQUEST ========

router.post("/", authMiddleware, createRequest);

// ============ DONOR GETS REQUESTS =============

router.get("/", authMiddleware, getAllRequests);

// =========== RECIPIENT GETS HIS/HER REQUESTS =============

router.get("/my", authMiddleware, getMyRequests);

// ======== DONOR ACCEPT / REJECT REQUEST =========

router.patch("/:id/status", authMiddleware, updateRequestStatus);

// ======== MATCHING DONORS =========

router.get("/:requestId/matching-donors", authMiddleware, findMatchingDonors);

module.exports = router;
