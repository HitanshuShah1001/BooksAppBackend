const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Phone: { type: String, required: true, unique: true },
  Email: { type: String, unique: true },
  Password: { type: String, required: true },
  ProfilePhoto: { type: String },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
