const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDonorProfile,
  getDonorRequests,
  updateRequestStatus,
  updateAvailability,
} = require("../controllers/donorDashboardController");

router.get("/donors/me", authMiddleware, getDonorProfile);

router.patch("/donors/availability", authMiddleware, updateAvailability);

router.get("/blood-requests/donor", authMiddleware, getDonorRequests);

router.patch("/blood-requests/:id/status", authMiddleware, updateRequestStatus);

module.exports = router;
