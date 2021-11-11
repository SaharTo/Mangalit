const Meal = require("./models/meal");
const Review = require("./models/review");
const SideMeal = require("./models/sideMeal");
const { reviewSchema, mealSchema, sideMealSchema } = require("./schemas.js");

function isLoggedIn(req, res, next) {
    if (!req.session || !req.session.user) {
        res.status(401).end("Not authenticated, Please Login");
        return;
    }
    next();
}

async function validateMeal(req, res, next) {
    const { error } = mealSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(","); //insert that char between each word in the string in this case, between each obj in the array
        //throw new ExpressError(msg, 400);
        console.log("error occured " + error);
    } else {
        next();
    }
}
async function validateSideMeal(req, res, next) {
    const { error } = sideMealSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(","); //insert that char between each word in the string in this case, between each obj in the array
        //throw new ExpressError(msg, 400);
        console.log("error occured " + error);
    } else {
        next();
    }
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

async function validateReview(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(","); //insert that char between each word in the string in this case, between each obj in the array
        //throw new ExpressError(msg, 400);
        console.log("error occured " + error);
    } else {
        next();
    }
}

module.exports = { isLoggedIn, isAuthor, validateReview, validateMeal, validateSideMeal };