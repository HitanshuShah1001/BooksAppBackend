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
router.delete("/delete", BookController.DeleteAllBooks);
router.post(
  "/requestforborrowingdays/:id",
  AuthController.Protect,
  BookController.DaysRequiredToBorrow
);
router.post("/addtocart/:id", AuthController.Protect, BookController.AddToCart);
router.post(
  "/acceptborrowbookrequest/:id",
  AuthController.Protect,
  BookController.AcceptBorrowBookRequest
);
router.post(
  "/transactioncomplete/:id",
  AuthController.Protect,
  BookController.LendingTransactionComplete
);
router.delete("/delete/:id", AuthController.Protect, BookController.Deletebook);
router.get("/owner", AuthController.Protect, BookController.GetBookWrtUser);
module.exports = router;
