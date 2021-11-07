const express = require("express");
const router = express.Router();
const meats = require("../controllers/meats");

router.route("/")
    .get(meats.index)
    .post(meats.createMeat);

router.route("/:id")
    .get(meats.meatById)
    .put(meats.updateMeat)
    .delete(meats.deleteMeat);

module.exports = router;