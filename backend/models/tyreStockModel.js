const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tyreStockSchema = new Schema(
  {
    brand: { type: String, require: true },
    godown: { type: String, require: true },
    vehicle_name: { type: String, require: true },
    size: { type: String, require: true },
    no_of_units: { type: Number, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const tyreStock = mongoose.model("tyreStock", tyreStockSchema);

module.exports = tyreStock;
