const Meal = require("../models/meal");
const Meat = require("../models/meat");
const Review = require("../models/review");

module.exports.index = async(req, res) => {
    const meals = await Meal.find({});
    res.send(meals);
};

module.exports.mealReviews = async(req, res) => {
    const meal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
    if (!meal) {
        res.status(401).send("מנה לא נמצאה");
    }
    res.send(meal.mealReviews);
}


module.exports.rnd8Meals = async(rec, res) => {
    const meals = await Meal.find({});
    const rndMeals = meals;
    for (let i = rndMeals.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = rndMeals[i];
        rndMeals[i] = rndMeals[j];
        rndMeals[j] = temp;
    }
    rndMeals.splice(8, rndMeals.length);
    res.send(rndMeals);
};

module.exports.topTenMeals = async(rec, res) => {
    const meals = await Meal.find({});
    const newMeals = meals;
    newMeals.sort((a, b) => {
        const aLen = a.mealLikes.length;
        const bLen = b.mealLikes.length;
        return bLen - aLen;
    });
    newMeals.splice(10, newMeals.length);
    res.send(newMeals);
};

module.exports.deleteMeal = async(req, res) => {
    const { id } = await req.params;
    const meal = await Meal.findById(req.params.id)
    try {
        for (let i = 0; i < meal.mealReviews.length; i++) {
            await Review.findByIdAndDelete(meal.mealReviews[i]);
        }
        await Meal.findByIdAndDelete(id);
        res.send("מנה נמחקה");
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
};

module.exports.updateMeal = async(req, res) => {
    const { id } = req.params;
    const meal = await Meal.findByIdAndUpdate(
        id, { $set: req.body.meal }, { new: true }
    );
    res.send(meal);
};

module.exports.createMeal = async(req, res) => {
    const meal = await new Meal(req.body.meal);
    try {
        if (req.session.user) meal.mealAuthor = req.session.user._id;
        await meal.save();
        res.send(meal);
    } catch (e) {
        res.status(401).send(e);
    }
};

module.exports.mealById = async(req, res) => {
    const meal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate({
            path: "mealRecommendedSideMeals",
            populate: {
                path: "sideMealsAuthor",
                select: "fullName",
            },
            select: "sideMealName",
        })
        .populate("mealMeatInfo", "meatName")
        .populate("mealAuthor", "fullName");
    if (!meal) {
        res.status(401).send("מנה לא נמצאה");
    }
    res.send(meal);
};

module.exports.addReview = async(req, res) => {
    const meal = await Meal.findById(req.params.id);
    const review = new Review(req.body.review);
    review.reviewAuthor = req.session.user._id;
    await review.save();
    meal.mealReviews.push(review);
    await meal.save();
    const newMeal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        });
    res.send(newMeal.mealReviews)
};

module.exports.deleteReview = async(req, res) => {
    const meal = await Meal.findById(req.params.id);
    await Review.findByIdAndDelete(req.params.reviewId);
    const index = meal.mealReviews.indexOf(req.params.reviewId);
    meal.mealReviews.splice(index, 1);
    await meal.save();
    const newMeal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        });
    res.send(newMeal.mealReviews)
};
module.exports.addLike = async(req, res) => {
    const meal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate({
            path: "mealRecommendedSideMeals",
            populate: {
                path: "sideMealsAuthor",
                select: "fullName",
            },
            select: "sideMealName",
        })
        .populate("mealMeatInfo", "meatName")
        .populate("mealAuthor", "fullName");
    const userId = req.session.user._id;
    meal.mealLikes.push(userId);
    await meal.save();
    res.send(meal);
};
module.exports.deleteLike = async(req, res) => {
    const meal = await Meal.findById(req.params.id)
        .populate({
            path: "mealReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate({
            path: "mealRecommendedSideMeals",
            populate: {
                path: "sideMealsAuthor",
                select: "fullName",
            },
            select: "sideMealName",
        })
        .populate("mealMeatInfo", "meatName")
        .populate("mealAuthor", "fullName");
    const userId = req.session.user._id;
    const index = meal.mealLikes.indexOf(userId);
    meal.mealLikes.splice(index, 1);
    await meal.save();
    res.send(meal);
};