const Review = require("../models/review");
const Meal = require("../models/meal");

module.exports.reviewIndex = async(req, res) => {
    const reviews = await Review.find({})
        .populate("reviewAuthor", "fullName");
    res.send(reviews);
}
module.exports.reviewById = async(req, res) => {
    const review = await Review.findById(req.params.id)
        .populate("reviewAuthor", "fullName");
    res.send(review);
}