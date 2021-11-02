const express = require("express");
const router = express.Router();
const sideMeals = require("../controllers/sideMeals");

router.get("/", sideMeals.sideMeaIIndex);
router.get("/sideMeal/:id", sideMeals.sideMealById);
router.delete("/delete/:id", sideMeals.deleateSideMeal);
router.put("/edit/:id", sideMeals.updateSideMeal);
router.post("/add", sideMeals.createSideMeal);

//for tests
// router.get("/delete/:id", sideMeals.deleateSideMeal);
// router.get("/add", sideMeals.createSideMeal2);

module.exports = router;