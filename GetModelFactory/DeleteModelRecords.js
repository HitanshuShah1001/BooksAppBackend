const Errorcontroller = require("../controller/Errorcontroller");

exports.DeleteAllRecords = (Model) => async (req, res) => {
  try {
    const records = await Model.deleteMany({});
    return res.status(204).json({
      status: `Success`,
      data: records,
      count: records.length,
    });
  } catch (e) {
    Errorcontroller(400, res, `Error deleting records`);
  }
};
