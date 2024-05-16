const bookingModel = require("../models/bookingsModel");

async function bookPlace(req, res) {
  const {
    bookedDays,
    checkIn,
    checkOut,
    guests,
    place_id,
    mobile,
    user_id,
    price,
  } = req.body;
  bookingModel
    .create({
      bookedDays,
      checkIn,
      checkOut,
      guests,
      place_id,
      mobile,
      user_id,
      price,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json({ err });
    });
}

async function getbookPlace(req, res) {
  const { id } = req.params;
  res.json(await bookingModel.findById(id).populate("place_id"));
}

module.exports = { bookPlace, getbookPlace };
