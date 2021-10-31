const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.get("/", sideMeals.printSideMeals)
router.get("/:id", sideMeals.sideMealById)
router.post("/add", sideMeals.addSideMeal)

module.exports = router;