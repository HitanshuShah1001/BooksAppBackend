const express = require("express");
const router = express.Router();
const BookController = require("../controller/BookController");
const UserController = require("../controller/Usercontroller");

router.post("/upload", UserController.Bookphotos, BookController.UploadBook);

module.exports = router;
