const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const download = require("image-downloader");
const userModel = require("../models/userModel");
const placeModel = require("../models/placeModel");
const bookingModel = require("../models/bookingsModel");

async function signupUser(req, res) {
  const { name, email, pass } = req.body;
  if (!name || !email || !pass) {
    res.status(400);
  }
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    res.status(400);
    res.json({ error: "already exists" });
  } else {
    const hashPass = await bcrypt.hash(pass, 10);
    const user = await userModel.create({ name, email, pass: hashPass });
    res.json(user);
  }
}

async function loginUser(req, res) {
  const { email, pass } = req.body;
  if (!email || !pass) {
    res.status(400);
  }
  const findUser = await userModel.findOne({ email });
  if (findUser && bcrypt.compareSync(pass, findUser.pass)) {
    jwt.sign(
      { email: findUser.email, id: findUser._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).status(200).json(findUser);
      }
    );
  } else {
    res.status(400).json({ error: "Email or pass wrong" });
  }
}

async function profile(req, res) {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userCookie) => {
      if (error) throw error;
      const { name, email, _id } = await userModel.findById(userCookie.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
}

async function logout(req, res) {
  res.cookie("token", "").json("logout success");
}

async function uploadPhoto(req, res) {
  const { link } = req.body;
  const nameImg = Date.now() + ".jpg";
  download
    .image({ url: link, dest: path.join(__dirname, "..", "uploads", nameImg) })
    .then(() => {
      res.json(nameImg);
    })
    .catch((error) => res.status(400).json({ error }));
}

async function upload(req, res) {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const newParts = newPath.split("\\");
    uploadedFiles.push(newParts[newParts.length - 1]);
  }
  res.json(uploadedFiles);
}

async function createPlace(req, res) {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userCookie) => {
    if (error) {
      res.status(400).json({ error: "cookie failed" });
      throw error;
    } else {
      const place = await placeModel.create({
        owner: userCookie.id,
        title,
        address,
        photos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(place);
    }
  });
}

async function getPlaces(req, res) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userCookie) => {
    if (error) {
      res.status(400).json({ error: "cookie failed" });
      throw error;
    } else {
      const { id } = userCookie;
      res.json(await placeModel.find({ owner: id }));
    }
  });
}

async function updatePlace(req, res) {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userCookie) => {
    if (error) {
      res.status(400).json({ error: "cookie failed" });
      throw error;
    } else {
      const placeData = await placeModel.findById(id);
      if (userCookie.id === placeData.owner.toString()) {
        placeData.set({
          title,
          address,
          photos,
          desc,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await placeData.save();
        res.json({ msg: "Okay" });
      } else {
        res.json.status(401).json({ error: "Not Authorized" });
      }
    }
  });
}

async function loadBookings(req, res) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userCookie) => {
    if (error) {
      res.status(400).json({ error: "cookie failed" });
      throw error;
    } else {
      const { id } = userCookie;
      res.json(await bookingModel.find({ user_id: id }).populate("place_id"));
    }
  });
}

async function removePlace(req, res) {
  const ID = req.body.id;
  const placeDoc = await placeModel.findByIdAndDelete(ID);
  res.json(placeDoc);
}

async function removeBooking(req, res) {
  const ID = req.body.id;
  const bookDoc = await bookingModel.findByIdAndDelete(ID);
  res.json(bookDoc);
}

module.exports = {
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
};
