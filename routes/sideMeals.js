const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.get("/", sideMeals.sideMealIndex);
router.get("/:id", sideMeals.sideMealById);
router.delete("/:id", sideMeals.deleateSideMeal);
router.put("/:id", sideMeals.updateSideMeal);
router.post("/", sideMeals.createSideMeal);

//for tests
// router.get("/delete/:id", sideMeals.deleateSideMeal);
// router.get("/add", sideMeals.createSideMeal2);

module.exports = router;