const User = require("../models/User");
const BloodRequest = require("../models/donorDashboardBloodRequest");

/* =======
   DONOR AUTH HELPER
   Your existing authMiddleware already sets req.user.
==========*/

function getUserId(req) {
  return req.user?.id || req.user?._id || req.user?.userId;
}

function isDonor(req) {
  const role = req.user?.role || req.user?.userType || req.user?.userRole;

  return String(role || "").toLowerCase() === "donor";
}

/* ===========GET /api/donors/me===============*/

async function getDonorProfile(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    if (!isDonor(req)) {
      return res.status(403).json({
        message: "Donor access required.",
      });
    }

    const donor = await User.findById(userId).select("-password");

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found.",
      });
    }

    return res.status(200).json({
      donor,
    });
  } catch (err) {
    console.error("GET DONOR PROFILE ERROR:", err);

    return res.status(500).json({
      message: "Server error while fetching donor profile.",
    });
  }
}

/* ============GET /api/blood-requests/donor=============== */

async function getDonorRequests(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    if (!isDonor(req)) {
      return res.status(403).json({
        message: "Donor access required.",
      });
    }

    const requests = await BloodRequest.find({
      donor: userId,
    })
      .populate("recipient", "name phone city")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      requests,
    });
  } catch (err) {
    console.error("GET DONOR REQUESTS ERROR:", err);

    return res.status(500).json({
      message: "Server error while fetching requests.",
    });
  }
}

/* ======PATCH /api/blood-requests/:id/status=========*/

async function updateRequestStatus(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    if (!isDonor(req)) {
      return res.status(403).json({
        message: "Donor access required.",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["ACCEPTED", "REJECTED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be ACCEPTED or REJECTED.",
      });
    }

    const request = await BloodRequest.findOne({
      _id: id,
      donor: userId,
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found.",
      });
    }

    if (request.status !== "PENDING") {
      return res.status(400).json({
        message: `Request already ${request.status.toLowerCase()}.`,
      });
    }

    request.status = status;

    await request.save();

    return res.status(200).json({
      message: `Request ${status.toLowerCase()} successfully.`,
      request,
    });
  } catch (err) {
    console.error("UPDATE REQUEST STATUS ERROR:", err);

    return res.status(500).json({
      message: "Server error while updating request.",
    });
  }
}

/* ==========PATCH /api/donors/availability============= */

async function updateAvailability(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User authentication information is missing.",
      });
    }

    if (!isDonor(req)) {
      return res.status(403).json({
        message: "Donor access required.",
      });
    }

    const { isAvailable } = req.body;

    const donor = await User.findByIdAndUpdate(
      userId,
      {
        isAvailable: Boolean(isAvailable),
      },
      {
        new: true,
      },
    ).select("-password");

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found.",
      });
    }

    return res.status(200).json({
      message: `You are now marked as ${
        donor.isAvailable ? "available" : "unavailable"
      }.`,
      donor,
    });
  } catch (err) {
    console.error("UPDATE AVAILABILITY ERROR:", err);

    return res.status(500).json({
      message: "Server error while updating availability.",
    });
  }
}

module.exports = {
  getDonorProfile,
  getDonorRequests,
  updateRequestStatus,
  updateAvailability,
};
