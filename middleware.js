const Meal = require("./models/meal");
const Review = require("./models/review");
const SideMeal = require("./models/sideMeal");
const { reviewSchema, mealSchema, sideMealSchema } = require("./schemas.js");

function isLoggedIn(req, res, next) {
    console.log('middleware session', req.session);
    // if (!sessionStorage.getItem('logedInUser')) {
    if (!req.session || !req.session.user) {
        res.status(401).end("Not authenticated, Please Login");
        return;
    }
    next();
}

function isAdmin(req, res, next) {
    console.log("inside isAdmin function ");
    if (!req.session.user || !req.session.user.isAdmin) {
        res
            .status(401)
            .end(
                "You are not not an admin, so you are not allowed to enter this function authenticated"
            );
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
async function validateReview(req, res, next) {
    console.log(req.body);

    const { error } = reviewSchema.validate(req.body);
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
    const user = sessionStorage.getItem('logedInUser');
    // sessionStorage.getItem('logedInUser')

    if (!user.isAdmin) {
        if (review) {
            if (review.reviewAuthor != user._id) { //check if there is a review and if the review author is the loggedin user
                res.send("failed, isn't the author");
                return;
            }
        } else {
            if (sideMeal && sideMeal.sideMealsAuthor != user._id) { //check if there is a sideMeal and if the sideMeal author is the loggedin user
                res.send("failed, isn't the author");
                return;
            }
            if (meal && meal.mealAuthor != user._id) { //check if there is a meal and if the meal author is the loggedin user
                res.send("failed, isn't the author");
                return;
            }
        }
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAuthor,
    validateReview,
    validateMeal,
    validateSideMeal,
    isAdmin,
};