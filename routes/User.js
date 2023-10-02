const express = require("express");
const bcrypt = require("bcrypt");
const AuthController = require("../controller/Authcontroller");
const UserController = require("../controller/Usercontroller");
const ErrorController = require("../controller/Errorcontroller");
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
module.exports = router;
