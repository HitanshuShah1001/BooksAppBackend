const express = require("express");
const DeleteController = require("../controller/Deletecontroller");
const router = express.Router();

router.post("/AllUsers", DeleteController.DeleteUser);

module.exports = router;
