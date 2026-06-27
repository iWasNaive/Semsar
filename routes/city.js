const express = require("express");
const controller = require("../controllers/city");

const router = express.Router();

router.route("/").post(controller.create).get(controller.getAll)

module.exports = router;
