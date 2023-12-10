const mongoose = require("mongoose");

const formdataschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  review: { type: String, required: true },
});

module.exports = mongoose.model("AIToolForm", formdataschema);
