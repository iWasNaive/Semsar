const express = require("express");

const controller = require("./../controllers/bookmark");
const authGuard = require("./../middlewares/authGuard");

const router = express.Router();

router.route("/").post(authGuard, controller.create);

module.exports = router;
