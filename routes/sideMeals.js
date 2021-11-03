const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.get("/", sideMeals.sideMealIndex);
router.get("/:id", sideMeals.sideMealById);
router.delete("/:id", sideMeals.deleateSideMeal);
router.put("/:id", sideMeals.updateSideMeal);
router.post("/", sideMeals.createSideMeal);

module.exports = router;