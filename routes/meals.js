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

router.get("/rndMeals", meals.rnd8Meals);
router.get("/topTenMeals", meals.topTenMeals);
router
    .route("/:id")
    .get(meals.mealById)
    .delete( /*isLoggedIn, isAuthor,*/ meals.deleteMeal)
    .put(isLoggedIn, isAuthor, validateMeal, meals.updateMeal);
router.get("/:id/reviews", meals.mealReviews);
router
    .route("/:id/like")
    .put(isLoggedIn, meals.addLike)
    .delete(isLoggedIn, meals.deleteLike);

router.put("/:id/review", isLoggedIn, validateReview, meals.addReview);
router.delete(
    "/:id/review/:reviewId",
    isLoggedIn,
    isAuthor,
    meals.deleteReview
);

module.exports = router;