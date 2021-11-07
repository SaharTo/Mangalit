const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.get("/", sideMeals.sideMealIndex);
router.get("/:id", sideMeals.sideMealById);
router.delete("/:id", sideMeals.deleateSideMeal);
router.put("/:id", sideMeals.updateSideMeal);
router.put("/:id/addReview", sideMeals.addReview);
router.delete("/:id/deleteReview/:reviewId", sideMeals.deleteReview);
router.post("/", sideMeals.createSideMeal);

module.exports = router;