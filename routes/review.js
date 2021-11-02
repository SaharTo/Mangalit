const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");

router.post("/add", review.createReview);
router.delete("/delete/:id", review.deleteReview);

module.exports = router;