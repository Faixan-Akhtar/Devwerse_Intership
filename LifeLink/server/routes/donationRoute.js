const express = require("express");

const {
  respondToRequest,
  getRequestResponses,
  acceptDonationResponse,
} = require("../controllers/donationController.js");

const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, respondToRequest);

router.get("/requests/:requestId", authMiddleware, getRequestResponses);

router.patch("/:responseId/accept", authMiddleware, acceptDonationResponse);

module.exports = router;
