const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Author: { type: String },
  Photos: { type: [String], required: true },
  Type: { type: String, enum: [`buy`, `sell`], required: true },
  Description: { type: String },
  Location: {
    type: [Number],
    validate: { validator: (value) => value.length == 2 },
    required: true,
  },
  To_Show: { type: Boolean, default: true },
  Is_Bought: { type: Boolean, default: false },
  Bought_By: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  UploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
