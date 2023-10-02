const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.CheckEmailPasswordExist = (body) => !body.email || !body.password;

exports.signToken = (id) => jwt.sign({ id }, process.env.SECRET);

exports.createToken = async (newUser, statusCode, res) => {
  const token = this.signToken(newUser._id);
  return res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user: newUser,
    },
  });
};

exports.HashPassword = async (req, res, next) => {
  try {
    const { Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 12);
    req.body.Password = hashedPassword;
    next();
  } catch (error) {
    ErrorController(500, res, `Internal Server Error`);
    next();
  }
};
