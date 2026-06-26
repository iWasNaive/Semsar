const express = require("express");
const controller = require("./../controllers/auth");
const router = express.Router();

router.route("/register").post(controller.create);
router.route("/login").post(controller.login);
module.exports = router;
