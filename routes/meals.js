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

router
  .route("/:id")
  .get(meals.mealById)
  .delete(isAuthor, meals.deleteMeal)
  .put(isAuthor, validateMeal, meals.updateMeal);

router.put("/:id/review", /*isLoggedIn,*/ validateReview, meals.addReview);
router.delete("/:id/review/:reviewId", isAuthor, meals.deleteReview);

module.exports = router;
