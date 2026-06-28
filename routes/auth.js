const express = require("express");
const controller = require("./../controllers/auth");
const router = express.Router();
const authGuard = require("./../middlewares/authGuard");

router.route("/register").post(controller.create);
router.route("/login").post(controller.login);

router.route("/me").get(authGuard, controller.checkCookie);
module.exports = router;
