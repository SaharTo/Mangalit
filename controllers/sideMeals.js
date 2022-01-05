const SideMeal = require("../models/sideMeal");
const Review = require("../models/review");

module.exports.sideMealIndex = async(req, res) => {
    const sideMeals = await SideMeal.find({});
    res.send(sideMeals);
};

module.exports.topTenSideMeals = async(rec, res) => {
    const sideMeals = await SideMeal.find({});
    const newSideMeals = sideMeals;
    newSideMeals.sort((a, b) => {
        const aLen = a.sideMealLikes.length;
        const bLen = b.sideMealLikes.length;
        return bLen - aLen;
    });
    newSideMeals.splice(10, newSideMeals.length);
    res.send(newSideMeals);
};

module.exports.sideMealById = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate("sideMealsAuthor", "fullName");
    if (!sideMeal) {
        res.status(401).send("לא נמצאה מנת צד");
    }
    res.send(sideMeal);
};

module.exports.deleteSideMeal = async(req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const sideMeal = await SideMeal.findById(req.params.id)
    for (let i = 0; i < sideMeal.sideMealsReviews.length; i++) {
        await Review.findByIdAndDelete(sideMeal.sideMealsReviews[i]);
    }
    await SideMeal.findByIdAndDelete(req.params.id);
    res.send("מנת צד נמחקה");
};


module.exports.sideMealsReviews = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
    if (!sideMeal) {
        res.status(401).send("לא נמצאה מנת צד");
    }
    res.send(sideMeal.sideMealsReviews);
}


module.exports.updateSideMeal = async(req, res) => {
    const { id } = req.params;
    const sideMeal = await SideMeal.findByIdAndUpdate(id, {
        ...req.body.sideMeal,
    });
    await sideMeal.save();
    res.send("מנת צד עודכנה");
};

module.exports.createSideMeal = async(req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const sideMeal = new SideMeal(req.body.sideMeal);
    if (req.session.user) sideMeal.sideMealsAuthor = req.session.user._id;
    await sideMeal.save();
    res.send(sideMeal);
};

module.exports.addReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    const review = new Review(req.body.review);
    if (req.session.user) review.reviewAuthor = req.session.user._id;
    await review.save();
    sideMeal.sideMealsReviews.push(review);
    await sideMeal.save();
    const newSideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
    res.send(newSideMeal.sideMealsReviews)
};

module.exports.deleteReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    await Review.findByIdAndDelete(req.params.reviewId);
    const index = sideMeal.sideMealsReviews.indexOf(req.params.reviewId);
    sideMeal.sideMealsReviews.splice(index, 1);
    await sideMeal.save();
    const newSideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
    res.send(newSideMeal.sideMealsReviews)
};
module.exports.addLike = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate("sideMealsAuthor", "fullName");
    const userId = req.session.user._id;
    sideMeal.sideMealLikes.push(userId);
    await sideMeal.save();
    res.send(sideMeal);
};
module.exports.deleteLike = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: "fullName",
            },
        })
        .populate("sideMealsAuthor", "fullName");
    const userId = req.session.user._id;
    const index = sideMeal.sideMealLikes.indexOf(userId);
    sideMeal.sideMealLikes.splice(index, 1);
    await sideMeal.save();
    res.send(sideMeal);
};