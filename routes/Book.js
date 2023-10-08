const express = require("express");
const router = express.Router();
const BookController = require("../controller/BookController");
const UserController = require("../controller/Usercontroller");
const AuthController = require("../controller/Authcontroller");

router.post(
  "/upload",
  AuthController.Protect,
  UserController.Bookphotos,
  BookController.UploadBook
);
router.get("/", AuthController.Protect, BookController.GetAllBooks);
router.delete("/delete", AuthController.Protect, BookController.DeleteAllBooks);

module.exports = router;
