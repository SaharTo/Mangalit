const express = require("express");
const router = express.Router();
const meals = require("../controllers/meals");
//const meal = require("../models/meal");
const { isLoggedIn, isAuthor } = require("../middleware");

router.route("/").get(meals.index).post(meals.createMeal); //Here we goona insert the isLoggedIn middleware function

router
  .route("/:id")
  .get(meals.mealById)
  .delete(isAuthor, meals.deleteMeal)
  .put(meals.updateMeal);

/*
router.get("/", meals.index);
router.delete("/:id", meals.deleteMeal);

router.get("/:id", meals.mealById);
router.post("/add", meals.createMeal);
router.get("/update", meals.updateMeal);
//This is work too
*/
module.exports = router;
