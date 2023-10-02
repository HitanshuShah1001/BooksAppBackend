const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const ErrorHandler = require("../controller/Errorcontroller");

exports.SignUp = async (req, res) => {
  try {
    const image = {
      ProfilePhoto: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : ``,
    };
    const data = { ...req.body, ...image };
    const user = await User.create(data);
    UserUtil.createToken(user, 201, res);
  } catch (e) {
    ErrorHandler(501, res, e.message ?? `Internal Server error`);
  }
};

exports.Login = async (req, res) => {
  let { body } = req;
  result = UserUtil.CheckEmailPasswordExist(body);
  if (result) {
    const { Email, Password, ...rest } = body;
    const user = await User.findOne({ Email }).select("+Password");
    if (!CheckUserExistAndPasswordIsCorrect(user, Password, user.Password)) {
      return ErrorHandler(401, res, `Incorrect Email or Password`);
    } else {
      UserUtil.createToken(user, 201, res);
    }
  }
};

exports.CheckPassword = async (Password, UserPassword) =>
  await bcrypt.compare(Password, UserPassword);

const CheckUserExistAndPasswordIsCorrect = (user, Password, UserPassword) =>
  user || this.CheckPassword(Password, UserPassword);
