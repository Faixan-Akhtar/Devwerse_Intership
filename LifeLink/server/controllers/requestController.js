const BloodRequest = require("../models/BloodRequest.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");

const createRequest = async (req, res) => {
  try {
    // console.log("=================================");
    // console.log("CREATE BLOOD REQUEST");
    // console.log("USER:", req.user);
    // console.log("BODY:", req.body);
    // console.log("=================================");

    // =================AUTHENTICATION=================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user not found",
      });
    }

    const recipientId = req.user._id || req.user.id;

    if (!recipientId) {
      return res.status(401).json({
        success: false,
        message: "Recipient ID not found",
      });
    }

    // ==============REQUEST BODY==============

    const { donorId, bloodGroup, units, hospital, location, urgency, message } =
      req.body;

    // ==============DONOR VALIDATION==============

    if (!donorId) {
      return res.status(400).json({
        success: false,
        message: "Donor ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(donorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donor ID",
      });
    }

    // ============BLOOD GROUP============

    if (!bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "Blood group is required",
      });
    }

    // ========UNITS========

    if (!units || Number(units) < 1) {
      return res.status(400).json({
        success: false,
        message: "At least 1 unit is required",
      });
    }

    // ========HOSPITAL==========

    if (!hospital || !hospital.trim()) {
      return res.status(400).json({
        success: false,
        message: "Hospital is required",
      });
    }

    // =========LOCATION========

    if (!location || !location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    // ==========URGENCY=========
    if (!urgency) {
      return res.status(400).json({
        success: false,
        message: "Urgency is required",
      });
    }

    // ========DATABASE OBJECT========

    const requestData = {
      recipient: recipientId,

      donor: donorId,

      bloodGroup: bloodGroup,

      units: Number(units),

      hospital: hospital.trim(),

      location: location.trim(),

      urgency: urgency,

      message: message ? message.trim() : "",

      status: "pending",
    };

    // console.log("REQUEST DATA:");

    // console.log(requestData);

    // =========== SAVE =========

    const newRequest = await BloodRequest.create(requestData);

    // console.log("REQUEST CREATED:");

    // console.log(newRequest);

    

    // ========= POPULATE ============

    const populatedRequest = await BloodRequest.findById(newRequest._id)

      .populate("recipient", "name email phone city address")

      .populate(
        "donor",
        "name email phone bloodGroup city address photoUrl isAvailable",
      );

    // =========SUCCESS==========

    return res.status(201).json({
      success: true,

      message: "Blood request created successfully",

      request: populatedRequest,
    });
  } catch (error) {
    console.error("=================================");

    console.error("CREATE BLOOD REQUEST ERROR");

    console.error("=================================");

    console.error("NAME:", error.name);

    console.error("MESSAGE:", error.message);

    console.error("STACK:", error.stack);

    console.error("=================================");

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to create blood request",

      error: error.name || "ServerError",
    });
  }
};

// ==============GET DONOR REQUESTS=============

const getAllRequests = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first!",
      });
    }

    if (req.user.role !== "DONOR") {
      return res.status(403).json({
        message: "Only donors can view blood requests!",
      });
    }

    const requests = await BloodRequest.find({
      donor: req.user.id,
    })
      .populate("recipient", "name email phone city address")
      .populate(
        "donor",
        "name email phone bloodGroup city location isAvailable",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Blood requests fetched successfully!",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get donor requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// ========================= GET MY REQUESTS =========================
const getMyRequests = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first!",
      });
    }

    if (req.user.role !== "RECIPIENT") {
      return res.status(403).json({
        message: "Only recipients can view their requests!",
      });
    }

    const requests = await BloodRequest.find({
      recipient: req.user.id,
    })
      .populate(
        "donor",
        "name email phone bloodGroup city location isAvailable",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Your blood requests fetched successfully!",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get my requests error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// =========================
// FIND MATCHING DONORS
// =========================
// Kept for compatibility with your existing route.
const findMatchingDonors = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        message: "Please login first!",
      });
    }

    if (req.user.role !== "RECIPIENT") {
      return res.status(403).json({
        message: "Only recipients can find matching donors!",
      });
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
      return res.status(404).json({
        message: "Blood request not found!",
      });
    }

    if (bloodRequest.recipient.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to view matching donors!",
      });
    }

    if (bloodRequest.status !== "PENDING") {
      return res.status(400).json({
        message: "This blood request is no longer active!",
      });
    }

    const donors = await User.find({
      role: "DONOR",
      bloodGroup: bloodRequest.bloodGroup,
      isAvailable: true,
      $or: [
        {
          city: bloodRequest.location,
        },
        {
          location: bloodRequest.location,
        },
      ],
    }).select(
      "name email phone bloodGroup city location isAvailable lastDonationDate address photoUrl",
    );

    return res.status(200).json({
      message: "Matching donors found successfully!",
      count: donors.length,
      donors,
    });
  } catch (error) {
    console.error("Find matching donors error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // --------------LOGIN CHECK----------------

    if (!req.user) {
      return res.status(401).json({
        message: "Please login first!",
      });
    }

    // -------------DONOR ONLY--------------

    if (req.user.role !== "DONOR") {
      return res.status(403).json({
        message: "Only donors can accept or reject requests!",
      });
    }

    // ---------------VALID STATUS-----------------

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected",
      });
    }

    // --------------------------------------------------------
    // FIND REQUEST
    // IMPORTANT: BloodRequest, NOT Request
    // --------------------------------------------------------

    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Blood request not found",
      });
    }

    // --------------------------------------------------------
    // MAKE SURE THIS REQUEST BELONGS TO THIS DONOR
    // --------------------------------------------------------

    if (!request.donor || request.donor.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this request!",
      });
    }

    // --------------------------------------------------------
    // ONLY PENDING REQUEST CAN BE UPDATED
    // --------------------------------------------------------

    if (request.status !== "pending") {
      return res.status(400).json({
        message: `Request is already ${request.status}`,
      });
    }

    // --------------------UPDATE STATUS----------------------

    request.status = status;

    request.donor = req.user.id;

    await request.save();

    // ---------------------RETURN UPDATED REQUEST-------------------------

    const updatedRequest = await BloodRequest.findById(request._id)
      .populate("recipient", "name email phone city address")
      .populate(
        "donor",
        "name email phone bloodGroup city address isAvailable",
      );

    return res.status(200).json({
      success: true,

      message:
        status === "accepted"
          ? "Blood request accepted successfully."
          : "Blood request rejected successfully.",

      request: updatedRequest,
    });
  } catch (error) {
    console.error("UPDATE REQUEST STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update request status",
      error: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getMyRequests,
  findMatchingDonors,
  updateRequestStatus,
};
