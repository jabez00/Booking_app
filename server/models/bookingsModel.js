const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  bookedDays: Number,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  mobile: Number,
  price: Number,
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
