const express = require("express");
const controller = require("../controllers/city");

const router = express.Router();

router.route("/").post(controller.create);

module.exports = router;
