const Errorcontroller = require("../controller/Errorcontroller");

exports.GetAllRecords = (Model) => async (req, res) => {
  try {
    const records = await Model.find({});
    res.status(200).json({
      status: `Success`,
      data: records,
      count: records.length,
    });
  } catch (e) {
    Errorcontroller(400, res, `Error fetching records`);
  }
};
