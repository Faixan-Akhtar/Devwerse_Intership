const BloodRequest = require("../models/BloodRequest");

// ============CREATE BLOOD REQUEST=============
const createBloodRequest = async (req, res) => {
  try {
    const { donor, bloodGroup, city, hospital, reason, message } = req.body;

    if (!donor || !bloodGroup || !city || !reason) {
      return res.status(400).json({
        success: false,
        message: "Donor, blood group, city and reason are required",
      });
    }

    const request = await BloodRequest.create({
      recipient: req.user.id,
      donor,
      bloodGroup,
      city,
      hospital: hospital || "",
      reason,
      message: message || "",
      status: "PENDING",
    });

    const populatedRequest = await BloodRequest.findById(request._id)
      .populate("recipient", "name email phone city bloodGroup")
      .populate("donor", "name email phone city bloodGroup isAvailable");

    return res.status(201).json({
      success: true,
      message: "Blood request sent successfully",
      request: populatedRequest,
    });
  } catch (error) {
    console.error("Create blood request error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========== GET REQUESTS FOR LOGGED-IN DONOR============
const getDonorRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      donor: req.user.id,
    })
      .populate("recipient", "name email phone city bloodGroup age gender")
      .populate("donor", "name email phone city bloodGroup isAvailable")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get donor requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get donor requests",
      error: error.message,
    });
  }
};

// ================ACCEPT / REJECT REQUEST==================
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACCEPTED", "REJECTED", "COMPLETED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request status",
      });
    }

    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found",
      });
    }

    if (request.donor.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this request",
      });
    }

    if (request.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: `Request is already ${request.status}`,
      });
    }

    request.status = status;

    await request.save();

    const updatedRequest = await BloodRequest.findById(request._id)
      .populate("recipient", "name email phone city bloodGroup")
      .populate("donor", "name email phone city bloodGroup isAvailable");

    return res.status(200).json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Update request status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update request",
      error: error.message,
    });
  }
};

module.exports = {
  createBloodRequest,
  getDonorRequests,
  updateRequestStatus,
};
