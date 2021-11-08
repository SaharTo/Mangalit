const Meal = require("./models/meal");
const Review = require("./models/review");
const SideMeal = require("./models/sideMeal");

function isLoggedIn(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end("Not authenticated, Please Login");
    return;
  }
  next();
}

function isAuthorForUpdate(req, res, next) {
  if (
    req.body.mealAuthor != req.session.user._id ||
    req.body.sideMealAuthor != req.session.user._id
  ) {
    res.send("failed, isn't the author");
    return;
  }
  next();
}

async function isAuthor(req, res, next) {
  const { id, reviewId } = req.params;
  const meal = await Meal.findById(id);
  const sideMeal = await SideMeal.findById(id);
  const review = await Review.findById(reviewId);
  if (sideMeal && sideMeal.sideMealsAuthor != req.session.user._id) {
    res.send("failed, isn't the author");
    return;
  }
  if (meal && meal.mealAuthor != req.session.user._id) {
    res.send("failed, isn't the author");
    return;
  }
  if (review && review.reviewAuthor != req.session.user._id) {
    res.send("failed, isn't the author");
    return;
  }
  next();
}
module.exports = { isLoggedIn, isAuthor };
