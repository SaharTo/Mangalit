const SideMeal = require("../models/sideMeal");
const Review = require("../models/review");


module.exports.sideMealIndex = async(req, res) => {
    const sideMeals = await SideMeal.find({})
    res.send(sideMeals);
};

module.exports.sideMealById = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id)
        .populate({
            path: "sideMealsReviews",
            populate: {
                path: "reviewAuthor",
                select: 'fullName',
            },
        })
        .populate("sideMealsAuthor", "fullName");
    res.send(sideMeal);
};

module.exports.deleateSideMeal = async(req, res) => {
    await SideMeal.findByIdAndDelete(req.params.id);
    res.redirect("/sideMeals")
};

module.exports.updateSideMeal = async(req, res) => {
    const { id } = req.params;
    const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body });
    // const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body.sideMeal });
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        sideMeal.sideMealImage.push(...imgs);
    }
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};

module.exports.createSideMeal = async(req, res) => {
    const sideMeal = new SideMeal(req.body);
    // const sideMeal = new SideMeal(req.body.sideMeal);
    if (req.files) {
        sideMeal.sideMealImage = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
    }
    if (req.user) {
        sideMeal.sideMealsAuthor = req.user._id;
    } else {
        sideMeal.sideMealsAuthor = '6183a190801d27685741f1a9';
    }
    sideMeal.sideMealsReviews = [];
    await sideMeal.save();
    res.send(sideMeal);
};

module.exports.addReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        sideMeal.sideMealImage.push(...imgs);
    }
    const review = new Review(req.body);
    if (req.user) {
        review.reviewAuthor = req.user._id;
    } else {
        review.reviewAuthor = '6183a190801d27685741f1a9';
    }
    await review.save();
    sideMeal.sideMealsReviews.push(review);
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};
module.exports.deleteReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        sideMeal.sideMealImage.push(...imgs);
    }
    await Review.findByIdAndDelete(req.params.reviewId);
    const index = sideMeal.sideMealsReviews.indexOf(req.params.reviewId);
    sideMeal.sideMealsReviews.splice(index, 1);
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};