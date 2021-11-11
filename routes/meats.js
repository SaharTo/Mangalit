const express = require("express");
const router = express.Router();
const meats = require("../controllers/meats");
const { isAdmin } = require("../middleware");

router.route("/").get(meats.index).post(isAdmin, meats.createMeat);

router
  .route("/:id")
  .get(meats.meatById)
  .put(isAdmin, meats.updateMeat)
  .delete(isAdmin, meats.deleteMeat);

module.exports = router;
