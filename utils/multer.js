const multer = require("multer");
const path = require("node:path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
