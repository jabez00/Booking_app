const mongoose = require("mongoose");

const placeHistorySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const placeHistoryModel = mongoose.model("placeHistory", placeHistorySchema);

module.exports = placeHistoryModel;
