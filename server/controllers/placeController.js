const placeModel = require("../models/placeModel");

async function loadPlaces(req, res) {
  res.json(await placeModel.find());
}

async function editPlace(req, res) {
  const { id } = req.params;
  res.json(await placeModel.findById(id));
}

module.exports = { editPlace, loadPlaces };
