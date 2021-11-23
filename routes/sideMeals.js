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
  .post(/*isLoggedIn,*/ validateSideMeal, sideMeals.createSideMeal);

router
  .route("/:id")
  .get(sideMeals.sideMealById)
  .delete(isAuthor, sideMeals.deleateSideMeal)
  .put(isAuthor, validateSideMeal, sideMeals.updateSideMeal);

router.put("/:id/review", /*isLoggedIn,*/ validateReview, sideMeals.addReview);
router.delete("/:id/review/:reviewId", isAuthor, sideMeals.deleteReview);

module.exports = router;
