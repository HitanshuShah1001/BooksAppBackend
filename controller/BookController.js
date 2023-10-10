const Book = require("../models/Book");
const GetModelRecords = require("../GetModelFactory/GetModels");
const DeleteModelRecords = require("../GetModelFactory/DeleteModelRecords");

exports.UploadBook = async (req, res) => {
  try {
    let Photos = [];
    req.files.forEach((file) => {
      Photos.push(
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    });
    const data = { ...req.body, Photos, Owner: req.user, UploadedBy: req.user };
    const book = await Book.create(data);
    req.user.UploadedBooks.push(book._id);
    await req.user.save();
    return res.status(200).json({
      status: "Success",
      data: {
        book,
        message: `Book uploaded succesfully`,
      },
    });
  } catch (e) {
    console.log(e, "erROR OCCURED");
  }
};

exports.AddToCart = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const book = await Book.findById({ _id: id });
    book.AddedToCartBy.push(user._id);
    console.log(book.AddedToCartBy, "Book added to cart by");
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
    console.log(e, "An error occured");
  }
};
exports.GetAllBooks = GetModelRecords.GetAllRecords(Book);
exports.DeleteAllBooks = DeleteModelRecords.DeleteAllRecords(Book);
