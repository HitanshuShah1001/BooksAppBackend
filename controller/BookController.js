const Book = require("../models/Book");
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
        message: `Request for borrowing book for ${days} days sent succesfully`,
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
    const [book, borrower] = await Promise.all([
      Book.findById({ _id: id }),
      User.findById({ _id }),
    ]);
    if (!book) {
      ErrorController(404, res, `Book does not exist or has been deleted`);
    }
    book.To_Show = false;
    book.Borrowed_By = borrower._id;
    book.DaysBookIsBorrowedFor = days;
    book.Daysneededtobeborrowed = book.Daysneededtobeborrowed.filter(
      (dayswithuserid) => dayswithuserid.userId != _id
    );
    req.user.BooksToBeLent.push(id);
    borrower.BooksToBeBorrowed.push(id);
    await Promise.all([req.user.save(), borrower.save(), book.save()]);
    return res.status(200).json({
      status: `Success`,
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};

exports.LendingTransactionComplete = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const book = await Book.findById({ _id });
    book.LendingTime = new Date().getTime();
    await book.save();
    const [Owner, Borrower] = await Promise.all([
      User.findById({ _id: book.Owner }),
      User.findById({ _id: book.Borrowed_By }),
    ]);
    if (!Owner || !Borrower) {
      return ErrorController(404, res, "Owner or borrower not found");
    }

    Owner.BooksToBeLent = Owner.BooksToBeLent.filter((bookid) => bookid != _id);
    Owner.BooksLentCurrently.push(book._id);
    Owner.TotalBooksLent += 1;
    Borrower.TotalBooksBorrowed += 1;
    Borrower.BooksToBeBorrowed = Borrower.BooksToBeBorrowed.filter(
      (bookid) => bookid != _id
    );
    Borrower.BooksBorrowedCurrently.push(book._id);
    await Promise.all([Owner.save(), Borrower.save()]);
    return res.status(200).json({
      status: "Success",
      message: `Book Transaction complete`,
    });
  } catch (e) {
    ErrorController(500, res, "Internal server error");
  }
};

exports.ReturnTransactionComplete = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const book = await Book.findById({ _id });
    book.ReturnTime = new Date().getTime();
    book.TransactionComplete = true;
    await book.save();
    const [Owner, Borrower] = await Promise.all([
      User.findById({ _id: book.Owner }),
      User.findById({ _id: book.Borrowed_By }),
    ]);
    Owner.BooksLent.push(book._id);
    Borrower.BooksBorrowed.push(book._id);
    Owner.BooksLentCurrently.filter((book_id) => book_id != _id);
    Borrower.BooksBorrowedCurrently.filter((book_id) => book_id != id);
    if (!Owner || !Borrower) {
      return ErrorController(404, res, "Owner or borrower not found");
    }
    await Promise.all([Owner.save(), Borrower.save()]);
    return res.status(200).json({
      status: "Success",
      message: `Book Transaction complete`,
    });
  } catch (e) {
    ErrorController(500, res, "Internal server error");
  }
};

exports.BookBoughtButNotTransacted = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { id } = req.body;
    const { user } = req;
    const [Book, Buyer, Seller] = await Promise.all([
      Book.findById({ _id }),
      User.findById({ _id: id }),
      User.findById({ _id: user._id }),
    ]);
    Buyer.BooksToPickup.push(_id);
    Seller.BooksToBeSold.push(_id);
    await Promise.all([Book.save(), Buyer.save(), Seller.save()]);
  } catch (e) {}
};

exports.SellTransactionComplete = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { id } = req.body;
    const { user } = req;
    const [Book, Buyer, Seller] = await Promise.all([
      Book.findById({ _id }),
      User.findById({ _id: id }),
      User.findById({ _id: user._id }),
    ]);
    Buyer.BooksBought.push(_id);
    Seller.BooksSold.push(_id);
    Buyer.TotalBooksBought += 1;
    Seller.TotalBooksSold += 1;
    Seller.BooksToBeSold = Seller.BooksToBeSold.filter(
      (bookid) => bookid != _id
    );
    Buyer.BooksToPickup = Buyer.BooksToPickup.filter((bookid) => bookid != _id);
    Book.TransactionComplete = true;
    Book.Owner = id;
    await Book.save();
  } catch (e) {}
};

exports.GetAllBooks = async (req, res) => {
  try {
    const { _id } = req.user;
    console.log(_id, "ID");
    const records = await Book.find({ Owner: { $ne: _id } });
    console.log(records, "records");
    res.status(200).json({
      status: `Success`,
      data: records,
      count: records.length,
    });
  } catch (e) {
    ErrorController(400, res, e.message);
  }
};

exports.DeleteAllBooks = DeleteModelRecords.DeleteAllRecords(Book);

exports.Deletebook = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    user.UploadedBooks = user.UploadedBooks.filter((bookid) => bookid != id);
    user.OwnedBooks = user.OwnedBooks.filter((bookid) => bookid != id);
    await user.save();
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
    await Promise.all(
      user.OwnedBooks.map(async (id) => {
        const book = await Book.findById({ _id: id });
        Books.push(book);
      })
    );
    return res.status(200).json({
      status: `success`,
      data: Books,
    });
  } catch (e) {
    ErrorController(500, res, e.message);
  }
};
