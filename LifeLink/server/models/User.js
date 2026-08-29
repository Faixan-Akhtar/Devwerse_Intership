const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["DONOR", "RECIPIENT"],
    required: true,
  },
  city: String,
  address: String,
  bloodGroup: String,
  gender: String,
  age: Number,
  weight: Number,
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
