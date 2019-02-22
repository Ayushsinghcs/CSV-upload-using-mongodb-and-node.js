const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diamondSchema = new Schema({
  stock_no: { type: mongoose.Schema.Types.Mixed },
  certificate_no: { type: mongoose.Schema.Types.Mixed },
  shape: String,
  size: { type: mongoose.Schema.Types.Mixed },
  color: String,
  clarity: String,
  cut: String,
  polish: String,
  symmetry: String,
  fluorescence: String,
  lab: String,
  rap: String,
  discount: { type: mongoose.Schema.Types.Mixed },
  pr_ct: { type: mongoose.Schema.Types.Mixed },
  total_price: { type: mongoose.Schema.Types.Mixed },
  measurements: { type: mongoose.Schema.Types.Mixed },
  total_depth: { type: mongoose.Schema.Types.Mixed },
  table: { type: mongoose.Schema.Types.Mixed },
  link: String,
  key_to_symbols: String
});

module.exports = mongoose.model("Diamond", diamondSchema);
