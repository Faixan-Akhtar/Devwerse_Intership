const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      required: true,
    },

    units: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    urgency: {
      type: String,
      enum: [
       "EMERGENCY",
       "SURGERY",
       "ACCIDENT",
       "MEDICAL TREAT",
       "LOW",
       "Normal",
       "HIGH",
       "CRITICAL",
       "OTHER",
      ],
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
  type: String,
  enum: [
    "pending",
    "accepted",
    "rejected",
    "fulfilled",
    "cancelled",
  ],
  default: "pending",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BloodRequest",
  bloodRequestSchema
);