const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodRequest",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "responded",
        "accepted",
        "completed",
        "cancelled",
      ],
      default: "responded",
    },
  },
  {
    timestamps: true,
  }
);

// A donor should not respond to the same request twice.
donationSchema.index(
  {
    donor: 1,
    request: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Donation",
  donationSchema
);