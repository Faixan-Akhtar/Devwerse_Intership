const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      city,
      address,
      bloodGroup,
      gender,
      age,
      weight,
    } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "Please fill the required fields!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: role === "DONOR" ? "DONOR" : "RECIPIENT",
      city,
      address,
      bloodGroup,
      gender,
      age,
      weight,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        address: user.address,
        bloodGroup: user.bloodGroup,
        gender: user.gender,
        age: user.age,
        weight: user.weight,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required!",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email and password!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email and password!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.Secret_key,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile is fetched Successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

//

const updateDonorProfile = async (req, res) => {
  try {
    if (req.user.role !== "DONOR") {
      return res.status(403).json({
        message: "Only donors can update donor profile!",
      });
    }

    const { bloodGroup, location, isAvailable, lastDonationDate } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bloodGroup,
        location,
        isAvailable,
        lastDonationDate,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "Donor profile updated successfully!",
      user,
    });
  } catch (error) {
    console.error("Update donor profile error:", error);

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const findMatchingDonors = async (req, res) => {
  try {
    const { requestId } = req.params;

    return res.status(200).json({
      success: true,
      message: "Matching donors endpoint is working",
      requestId,
    });
  } catch (error) {
    console.error("findMatchingDonors error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  profile,
  updateDonorProfile,
  findMatchingDonors,
};
