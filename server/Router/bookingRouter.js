const express = require("express");
const { bookPlace, getbookPlace } = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/", bookPlace);
bookingRouter.get("/:id", getbookPlace);

module.exports = bookingRouter;
