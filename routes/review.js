const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");

router.get("/", review.reviewIndex);
router.get("/:id", review.reviewById);

module.exports = router;