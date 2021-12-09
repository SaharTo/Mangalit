const express = require("express");
const router = express.Router();
const meals = require("../controllers/meals");
const {
    isLoggedIn,
    isAuthor,
    validateReview,
    validateMeal,
    isAdmin,
} = require("../middleware");

router
    .route("/")
    .get(meals.index)
    .post(isLoggedIn, validateMeal, meals.createMeal);

router.get('/rndMeals', meals.rnd8Meals)
router
    .route("/:id")
    .get(meals.mealById)
    .delete(isLoggedIn, isAuthor, meals.deleteMeal)
    .put(isLoggedIn, isAuthor, validateMeal, meals.updateMeal);

router.put("/:id/review", isLoggedIn, validateReview, meals.addReview);
router.delete("/:id/review/:reviewId", isLoggedIn, isAuthor, meals.deleteReview);

module.exports = router;