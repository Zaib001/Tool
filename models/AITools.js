const mongoose = require("mongoose");

const AIToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  varient: { type: String, enum: ["free", "freemium", "all", "paid", "Trial"], required: true },
  genre: { type: [String], required: true },
  costrange: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  popUpDescription: { type: String, required: true },
});

module.exports = mongoose.model("AITool", AIToolSchema);
