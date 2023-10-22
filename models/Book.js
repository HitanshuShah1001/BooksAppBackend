const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Author: { type: String },
  Photos: { type: [String], required: true },
  Type: { type: String, enum: [`lend`, `sell`, `both`], required: true },
  Description: { type: String },
  Category: { type: String, enum: ["fiction", "non-fiction"] },
  Location: {
    type: [Number],
    validate: { validator: (value) => value.length == 2 },
    required: true,
  },
  To_Show: { type: Boolean, default: true },
  Is_Bought: { type: Boolean, default: false },
  Bought_By: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Is_Lent: { type: Boolean, default: false },
  Borrowed_By: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  UploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  AddedToCartBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  Price: {
    type: Number,
    required: function () {
      return this.Type == "sell" || this.Type === "both";
    },
  },
  Daysneededtobeborrowed: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        days: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  ChargePerDay: {
    type: Number,
    required: function () {
      return this.Type === "lend" || this.Type === "both";
    },
  },
  OverdueCharge: {
    type: Number,
    required: function () {
      return ["lend", "both"].includes(this.Type);
    },
  },
  DaysBookIsBorrowedFor: { type: Number },
  LendingTime: { type: Date },
  ReturnTime: { type: Date },
  TransactionComplete: { type: Boolean, default: false },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
