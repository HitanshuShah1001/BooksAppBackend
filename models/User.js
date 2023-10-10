const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Phone: { type: String, required: true, unique: true },
  Email: { type: String, unique: true },
  Password: { type: String, required: true },
  ProfilePhoto: { type: String },
  UploadedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  BooksAddedToCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  BooksBought: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
