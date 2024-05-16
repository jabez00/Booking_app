const multer = require("multer");
const path = require("path");

const photosMiddleware = multer({
  dest: path.join("uploads"),
});

module.exports = photosMiddleware;
