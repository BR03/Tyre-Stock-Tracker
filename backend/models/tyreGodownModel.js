const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tyreGodownSchema = new Schema(
  {
    name: { type: String, require: true },
    location: { type: String, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const tyreGodown = mongoose.model("tyreGodown", tyreGodownSchema);

module.exports = tyreGodown;
