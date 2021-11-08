const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");
const { isAuthor, isLoggedIn } = require("../middleware");

router
  .route("/")
  .get(sideMeals.sideMealIndex)
  .post(isLoggedIn, sideMeals.createSideMeal);

router
  .route("/:id")
  .get(sideMeals.sideMealById)
  .delete(isAuthor, sideMeals.deleateSideMeal)
  .put(isAuthor, sideMeals.updateSideMeal);

router.put("/:id/addReview", isLoggedIn, sideMeals.addReview);
router.delete("/:id/deleteReview/:reviewId", isAuthor, sideMeals.deleteReview);

module.exports = router;
