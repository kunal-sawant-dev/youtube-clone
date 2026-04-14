const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  userId:String,
  videoId:String,
  date:Date
});

module.exports = mongoose.model("Download", downloadSchema);