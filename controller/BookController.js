const Book = require("../models/Book");
const GetModelRecords = require("../GetModelFactory/GetModels");
const DeleteModelRecords = require("../GetModelFactory/DeleteModelRecords");
const ErrorController = require("../controller/Errorcontroller");
const User = require("../models/User");

exports.UploadBook = async (req, res) => {
  try {
    let Photos = [];
    req.files.forEach((file) => {
      Photos.push(
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    });

    const data = {
      ...req.body,
      Photos,
      Owner: req.user._id,
      UploadedBy: req.user._id,
    };
    const book = await Book.create(data);
    req.user.UploadedBooks.push(book._id);
    req.user.OwnedBooks.push(book._id);
    await req.user.save();
    return res.status(200).json({
      status: "Success",
      data: {
        book: book,
        message: `Book uploaded succesfully`,
      },
    });
  } catch (e) {
    ErrorController(400, res, e.message);
  }
};

exports.DaysRequiredToBorrow = async (req, res) => {
  try {
    const { id: book_id } = req.params;
    const { _id } = req.user;
    const { days } = req.body;
    let book = await Book.findById({ _id: book_id });
    if (!book) {
      return ErrorController(400, res, `No Book Found`);
    }
    book.Daysneededtobeborrowed.push({ userId: _id, days });
    await book.save();
    return res.status(201).json({
      status: `Success`,
      data: {
        message: `Request for borrow book days sent succesfully`,
      },
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};

exports.AddToCart = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const book = await Book.findById({ _id: id });
    book.AddedToCartBy.push(user._id);
    user.BooksAddedToCart.push(book._id);
    await Promise.all([book.save(), user.save()]);
    return res.status(200).json({
      status: "Success",
      data: {
        book,
        message: `Book added to cart succesfully`,
      },
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};

exports.AcceptBorrowBookRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { days, _id } = req.body;
    const book = await Book.findById({ _id: id });
    if (!book) {
      ErrorController(404, res, `Book does not exist or has been deleted`);
    }
    book.To_Show = false;
    book.Borrowed_By = await User.findById({ _id });
    book.DaysBookIsBorrowedFor = days;
    await book.save();
    return res.status(200).json({
      status: `Success`,
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};
exports.GetAllBooks = GetModelRecords.GetAllRecords(Book);
exports.DeleteAllBooks = DeleteModelRecords.DeleteAllRecords(Book);

exports.Deletebook = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    user.UploadedBooks = user.UploadedBooks.filter((bookid) => bookid != id);
    user.OwnedBooks = user.OwnedBooks.filter((bookid) => bookid != id);
    await Promise.all([Book.deleteOne({ _id: id }), user.save()]);
    return res.status(201).json({
      status: `Success`,
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};

exports.GetBookWrtUser = async (req, res) => {
  try {
    const { user } = req;
    let Books = [];
    user.OwnedBooks.forEach(async (id) => {
      const book = await Book.findById({ _id: id });
      Books.push(book);
    });
    return res.status(200).json({
      status: `success`,
      data: Books,
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};
