const DonationResponse = require("../models/DonationResponse.js");
const BloodRequest = require("../models/BloodRequest.js");

// =========================DONOR RESPONDS TO REQUEST=========================
const respondToRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    if (req.user.role !== "DONOR") {
      return res.status(403).json({
        message: "Only donors can respond to blood requests!",
      });
    }

    if (!requestId) {
      return res.status(400).json({
        message: "Request ID is required!",
      });
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
      return res.status(404).json({
        message: "Blood request not found!",
      });
    }

    if (bloodRequest.status !== "PENDING") {
      return res.status(400).json({
        message: "This blood request is no longer active!",
      });
    }

    const existingResponse = await DonationResponse.findOne({
      donor: req.user.id,
      bloodRequest: requestId,
    });

    if (existingResponse) {
      return res.status(400).json({
        message: "You have already responded to this request!",
      });
    }

    const response = await DonationResponse.create({
      donor: req.user.id,
      bloodRequest: requestId,
      status: "INTERESTED",
    });

    return res.status(201).json({
      message: "You have successfully responded to the blood request!",
      response,
    });
  } catch (error) {
    console.error("Respond to request error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// =======================RECIPIENT VIEWS RESPONSES=========================
const getRequestResponses = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (req.user.role !== "RECIPIENT") {
      return res.status(403).json({
        message: "Only recipients can view donor responses!",
      });
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
      return res.status(404).json({
        message: "Blood request not found!",
      });
    }

    if (bloodRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view these responses!",
      });
    }

    const responses = await DonationResponse.find({
      bloodRequest: requestId,
    })
      .populate(
        "donor",
        "name email phone bloodGroup location isAvailable lastDonationDate",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Donor responses fetched successfully!",
      count: responses.length,
      responses,
    });
  } catch (error) {
    console.error("Get request responses error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// =========================ACCEPT DONOR=========================
const acceptDonationResponse = async (req, res) => {
  try {
    const { responseId } = req.params;

    if (req.user.role !== "RECIPIENT") {
      return res.status(403).json({
        message: "Only recipients can accept donors!",
      });
    }

    const response = await DonationResponse.findById(responseId);

    if (!response) {
      return res.status(404).json({
        message: "Donation response not found!",
      });
    }

    const bloodRequest = await BloodRequest.findById(response.bloodRequest);

    if (!bloodRequest) {
      return res.status(404).json({
        message: "Blood request not found!",
      });
    }

    if (bloodRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to accept this donor!",
      });
    }

    if (bloodRequest.status !== "PENDING") {
      return res.status(400).json({
        message: "This blood request is no longer active!",
      });
    }

    response.status = "ACCEPTED";
    await response.save();

    await DonationResponse.updateMany(
      {
        bloodRequest: bloodRequest._id,
        _id: { $ne: response._id },
        status: "INTERESTED",
      },
      {
        $set: {
          status: "REJECTED",
        },
      },
    );

    bloodRequest.status = "FULFILLED";
    await bloodRequest.save();

    return res.status(200).json({
      message: "Donor accepted successfully!",
      response,
      request: bloodRequest,
    });
  } catch (error) {
    console.error("Accept donation response error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = {
  respondToRequest,
  getRequestResponses,
  acceptDonationResponse,
};
