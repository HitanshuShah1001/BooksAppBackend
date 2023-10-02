const User = require("../models/User");

exports.DeleteUser = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(201).json({
      status: `Success`,
    });
  } catch (e) {
    console.log(`Error occured`);
  }
};
