const express = require("express");
const router = express.Router();
const meals = require("../controllers/meals");

router.get("/", meals.index)


module.exports = router;