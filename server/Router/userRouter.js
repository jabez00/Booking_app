const express = require("express");
const {
  signupUser,
  loginUser,
  profile,
  logout,
  uploadPhoto,
  upload,
  createPlace,
  getPlaces,
  updatePlace,
  loadBookings,
  removePlace,
  removeBooking,
} = require("../controllers/userController");
const photosMiddleware = require("../middleware/photosMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", profile);
userRouter.post("/logout", logout);
userRouter.post("/upload-photo", uploadPhoto);
userRouter.post("/upload", photosMiddleware.array("photos", 100), upload);
userRouter
  .route("/places")
  .post(createPlace)
  .get(getPlaces)
  .put(updatePlace)
  .delete(removePlace);
userRouter.route("/bookings").get(loadBookings).delete(removeBooking);

module.exports = userRouter;
