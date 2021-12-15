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

router
    .route("/:id")
    .get(sideMeals.sideMealById)
    .delete(isLoggedIn, isAuthor, sideMeals.deleateSideMeal)
    .put(isLoggedIn, isAuthor, validateSideMeal, sideMeals.updateSideMeal);

router
    .route("/:id/like")
    .put(isLoggedIn, sideMeals.addLike)
    .delete(isLoggedIn, sideMeals.deleteLike);

router.put("/:id/review", isLoggedIn, validateReview, sideMeals.addReview);
router.delete("/:id/review/:reviewId", isLoggedIn, isAuthor, sideMeals.deleteReview);

module.exports = router;