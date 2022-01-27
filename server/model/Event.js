const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  categories: [{
    type: String
  }],
  comments: [{
    comment: String,
    commentBy: String
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("event", EventSchema);
