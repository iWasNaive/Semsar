const express = require("express");
const controller = require("./../controllers/ad");
const upload = require("./../middlewares/uploader");
const authGuard = require("./../middlewares/authGuard");
const { roleGuard } = require("../middlewares/roleGuard");

const router = express.Router();

router
  .route("/")
  .post(authGuard, upload.array("images", 3), controller.create)
  .get(controller.showAds);

router
  .route("/pending-ads")
  .get(authGuard, roleGuard("admin"), controller.showPendingAds);

router.route("/:id").get(controller.getad);

router
  .route("/:id/status")
  .patch(authGuard, roleGuard("admin"), controller.changeStatus);

module.exports = router;
