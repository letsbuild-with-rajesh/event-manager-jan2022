const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("category", CategorySchema);
