const express = require("express");
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const Utils = require("../Utils/User");
const router = express.Router();

// Signup route
router.post(
  "/signUp",
  UserController.Userphoto,
  Utils.HashPassword,
  AuthController.SignUp
);

router.post("/login", AuthController.Login);
router.get("/", UserController.GetAllUsers);
router.delete("/delete", UserController.DeleteAllUsers);
module.exports = router;
