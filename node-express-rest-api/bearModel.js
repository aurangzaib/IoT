var mongoose = require("mongoose"),
   // bearschema
   bearSchema = new mongoose.Schema({
      name: String
   });

module.exports = mongoose.model("bear", bearSchema);
