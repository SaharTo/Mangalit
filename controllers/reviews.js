const Review = require("../models/review");
const Meal = require("../models/meal");
/*functions that handle the create and delete reviews calls on the DB (createReview, deleteReview)
In this controller we are not handling the reviews render because it's will render automatically on the meal page.
In addition, we should make sure that each meal schema have a review object that contains an array of all the reviews
of a specific meal.. :)*/

module.exports.reviewIndex = async(req, res) => {
    const reviews = await Review.find({});
    res.send(reviews);
}
module.exports.reviewById = async(req, res) => {
    const review = await Review.findById(req.params.id);
    res.send(review);
}
module.exports.deleteReview = async(req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect(`/reviews/`);

  const meal = await Meal.findById(req.params.MealId);
  console.log("This is the meal ");
  const review = new Review(req.body);
  console.log("This is the review ");
  //review.reviewAuthor = req.user._id; //have to check about the req.user
  meal.mealReviews.push(review);
  await review.save();
  await meal.save();
  res.send("Successfull added review");
};*/ //doesnt work yet
