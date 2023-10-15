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
  OwnedBooks: [
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
  BooksBorrowed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  BooksLent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  BooksSold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  TotalBooksBought: { type: Number, default: 0 },
  TotalBooksSold: { type: Number, default: 0 },
  TotalBooksLent: { type: Number, default: 0 },
  TotalBooksBorrowed: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
