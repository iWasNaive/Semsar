const express = require("express");
const controller = require("./../controllers/ad");
const upload = require("./../middlewares/uploader");
const authGuard = require("./../middlewares/authGuard");

const router = express.Router();

router.route("/").post(authGuard, upload.array("images", 3), controller.create);

module.exports = router;
