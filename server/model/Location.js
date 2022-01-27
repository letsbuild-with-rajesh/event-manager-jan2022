const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("location", LocationSchema);
