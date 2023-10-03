const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Author: { type: String },
  Photos: { type: [String], required: true },
  Type: { type: String, enum: [`buy`, `sell`], required: true },
  Location: {
    type: [Number],
    validate: { validator: (value) => value.length == 2 },
    required: true,
  },
  To_Show: { type: Boolean, default: true },
  Is_Bought: { type: Boolean, default: false },
  Bought_By: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Book = mongoose.Model("Book", BookSchema);
module.exports = Book;