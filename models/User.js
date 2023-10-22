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
  //BooksBorrowedCurrently and BooksLentCurrently will be for current books that are being borrowed or lent currently.
  //Books Borrowed and lent will be updated when the transaction is completed and will show a record of the borrowed and returned books
  //that hae their transaction complete.
  BooksBorrowedCurrently: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  BooksLentCurrently: [
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
  BooksToPickup: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  BooksToBeSold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  BooksToBeLent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  BooksToBeBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  BooksToBeBorrowed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  TotalBooksBought: { type: Number, default: 0 },
  TotalBooksSold: { type: Number, default: 0 },
  TotalBooksLent: { type: Number, default: 0 },
  TotalBooksBorrowed: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
