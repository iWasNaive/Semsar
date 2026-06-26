const express = require("express");
const controller = require("./../controllers/category");

const router = express.Router();

router.route("/").post(controller.create).get(controller.getAll);

module.exports = router;
