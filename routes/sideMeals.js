const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.route("/")
    .get(sideMeals.sideMealIndex)
    .post(sideMeals.createSideMeal);

router.route("/:id")
    .get(sideMeals.sideMealById)
    .delete(sideMeals.deleateSideMeal)
    .put(sideMeals.updateSideMeal);

router.put("/:id/addReview", sideMeals.addReview);
router.delete("/:id/deleteReview/:reviewId", sideMeals.deleteReview);

module.exports = router;