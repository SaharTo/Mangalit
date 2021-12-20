const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");
const {
  isAuthor,
  isLoggedIn,
  validateReview,
  validateSideMeal,
} = require("../middleware");

router
  .route("/")
  .get(sideMeals.sideMealIndex)
  .post(isLoggedIn, validateSideMeal, sideMeals.createSideMeal);
router.get("/topTenSideMeals", sideMeals.topTenSideMeals);

router
  .route("/:id")
  .get(sideMeals.sideMealById)
  .delete(isLoggedIn, isAuthor, sideMeals.deleteSideMeal)
  .put(isLoggedIn, isAuthor, validateSideMeal, sideMeals.updateSideMeal);

router.get("/:id/reviews",sideMeals.sideMealsReviews)


router
  .route("/:id/like")
  .put(isLoggedIn, sideMeals.addLike)
  .delete(isLoggedIn, sideMeals.deleteLike);

router.put("/:id/review", isLoggedIn, validateReview, sideMeals.addReview);
router.delete(
  "/:id/review/:reviewId",
  isLoggedIn,
  isAuthor,
  sideMeals.deleteReview
);

module.exports = router;
