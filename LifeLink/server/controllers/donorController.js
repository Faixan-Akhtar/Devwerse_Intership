const User = require("../models/User");

const getDonorProfile = async (req, res) => {
  try {
    const donor = await User.findOne({
      _id: req.user.id,
      role: "DONOR",
    }).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    console.error("Get donor profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isAvailable must be true or false",
      });
    }

    const donor = await User.findOneAndUpdate(
      {
        _id: req.user.id,
        role: "DONOR",
      },
      {
        isAvailable: isAvailable,
      },
      {
        new: true,
      },
    ).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      isAvailable: donor.isAvailable,
    });
  } catch (error) {
    console.error("Availability error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update availability",
    });
  }
};

const updateDonorProfile = async (req, res) => {
  try {
    const { fullName, phone, city, address, bloodGroup, gender, age, weight } =
      req.body;

    const donor = await User.findOneAndUpdate(
      {
        _id: req.user.id,
        role: "DONOR",
      },
      {
        fullName,
        phone,
        city,
        address,
        bloodGroup,
        gender,
        age,
        weight,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      donor,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const query = {
      role: "DONOR",
    };

    if (bloodGroup && bloodGroup.trim() !== "") {
      query.bloodGroup = bloodGroup.trim();
    }

    if (city && city.trim() !== "") {
      query.city = {
        $regex: city.trim(),
        $options: "i",
      };
    }

    // console.log("MongoDB Query:", query);

    const donors = await User.find(query);

    // console.log("Donors found:", donors.length);
    // console.log(donors);

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const donor = await User.findOne({
      _id: id,
      role: "DONOR",
    }).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    console.error("Get donor error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMyDonorProfile = async (req, res) => {
  try {
    // console.log("GET MY DONOR PROFILE");
    // console.log("USER FROM TOKEN:", req.user);

    

    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token",
      });
    }

    const donor = await User.findById(userId).select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    if (donor.role !== "DONOR") {
      return res.status(403).json({
        success: false,
        message: "This account is not a donor",
      });
    }

    return res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    console.error("Get my donor error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  searchDonors,
  getDonorById,
  getMyDonorProfile,
  updateDonorProfile,
};
