const express = require("express");
const router = express.Router();
const meats = require("../controllers/meats");

router.get("/", meats.index);
router.get("/meats/:id", meats.meatById); //wrong route name on purpose

module.exports = router;
