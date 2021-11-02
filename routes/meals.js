const express = require("express");
const router = express.Router();
const meals = require("../controllers/meals");
//const meal = require("../models/meal");

router.get("/", meals.index);
router.get("/mealws/:id", meals.mealById); //wrong route name on purpose
router.get("/add", meals.createMeal);
router.get("/delete", meals.deleteMeal);
router.get("/update", meals.updateMeal);

module.exports = router;
