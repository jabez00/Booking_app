const express = require("express");
const { editPlace, loadPlaces } = require("../controllers/placeController");

const placesRouter = express.Router();

placesRouter.get("/", loadPlaces);
placesRouter.get("/:id", editPlace);

module.exports = placesRouter;
