const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tyreBrandSchema = new Schema(
  {
    name: { type: String, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const tyreBrand = mongoose.model("tyreBrand", tyreBrandSchema);

module.exports = tyreBrand;
