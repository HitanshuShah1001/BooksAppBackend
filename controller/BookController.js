const Book = require("../models/Book");
const GetModelRecords = require("../GetModelFactory/GetModels");

exports.UploadBook = async (req, res) => {
  try {
    let Photos = [];
    req.files.forEach((file) => {
      Photos.push(
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    });
    const data = { ...req.body, Photos, Owner: req.user };
    const book = await Book.create(data);
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

exports.GetAllBooks = GetModelRecords.getAllRecords(Book);
