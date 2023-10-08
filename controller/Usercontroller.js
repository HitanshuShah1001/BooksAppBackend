const multer = require("multer");
const GetModelRecords = require("../GetModelFactory/GetModels");
const DeleteModelRecords = require("../GetModelFactory/DeleteModelRecords");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file?.originalname?.split(" ").join("-");
    cb(null, `${fileName}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log("Please upload only image");
  }
};

const upload = multer({ storage, fileFilter: multerFilter });

exports.Userphoto = upload.single("ProfilePhoto");
exports.Bookphotos = upload.array("Photos");
exports.GetAllUsers = GetModelRecords.GetAllRecords(User);
exports.DeleteAllUsers = DeleteModelRecords.DeleteAllRecords(User);
