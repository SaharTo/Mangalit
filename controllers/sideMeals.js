const SideMeal = require("../models/sideMeal");
const Review = require("../models/review");

module.exports.sideMealIndex = async(req, res) => {
    const sideMeals = await SideMeal.find({});
    res.send(sideMeals);
};

module.exports.topTenSideMeals = async(rec, res) => {
    // console.log("inside the top ten side meals controller function");
    const sideMeals = await SideMeal.find({});
    const newSideMeals = sideMeals;
    newSideMeals.sort((a, b) => {
        const aLen = a.sideMealLikes.length;
        const bLen = b.sideMealLikes.length;
        return bLen - aLen;
    });
    newSideMeals.splice(10, newSideMeals.length);
    // console.log("backend topTenSideMeals data ");
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
    await SideMeal.findByIdAndDelete(req.params.id);
    res.send("מנת צד נמחקה");
    // res.redirect("/sideMeals");
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
    // res.redirect(`/sideMeals/${req.params.id}`)
};

module.exports.createSideMeal = async(req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // console.log("create sideMeal controller  ", req.session);
    const sideMeal = new SideMeal(req.body.sideMeal);
    if (req.session.user) sideMeal.sideMealsAuthor = req.session.user._id;
    // else sideMeal.sideMealsAuthor = '61817186ca1fa6043ae22e90';
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
    // console.log("deleteLike");
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
    // console.log(userId);
    const index = sideMeal.sideMealLikes.indexOf(userId);
    // console.log(index);
    sideMeal.sideMealLikes.splice(index, 1);
    await sideMeal.save();
    res.send(sideMeal);
};