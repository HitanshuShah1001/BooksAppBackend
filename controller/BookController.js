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

exports.GetAllBooks = GetModelRecords.GetAllRecords(Book);
exports.DeleteAllBooks = DeleteModelRecords.DeleteAllRecords(Book);
