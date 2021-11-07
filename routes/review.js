const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");
router.post("/", review.createReview);

router.get("/", review.reviewIndex);
router.delete("/:reviewId", review.deleteReview);
router.post("/", review.createReview);

module.exports = router;
