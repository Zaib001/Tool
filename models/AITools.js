const mongoose = require('mongoose');

const aiToolSchema = new mongoose.Schema({
  toolName: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  g2ReviewUrl: { type: String },
  toolDescription: { type: String, required: true },
  yourName: { type: String, required: true },
  yourEmail: { type: String, required: true },
});

const AiTool = mongoose.model('AiTool', aiToolSchema);

module.exports = AiTool;
