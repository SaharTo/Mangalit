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
    const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body.sideMeal });
    await sideMeal.save();
    res.send("update")
        // res.redirect(`/sideMeals/${req.params.id}`)
};

module.exports.createSideMeal = async(req, res) => {
    const sideMeal = new SideMeal(req.body.sideMeal);
    if (req.session.user) sideMeal.sideMealsAuthor = req.session.user._id;
    // else sideMeal.sideMealsAuthor = '61817186ca1fa6043ae22e90';
    await sideMeal.save();
    res.send(sideMeal);
};

module.exports.addReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        sideMeal.sideMealImage.push(...imgs);
    }
    const review = new Review(req.body.review);
    review.reviewAuthor = req.session.user._id;
    await review.save();
    sideMeal.sideMealsReviews.push(review);
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};

module.exports.deleteReview = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    await Review.findByIdAndDelete(req.params.reviewId);
    const index = sideMeal.sideMealsReviews.indexOf(req.params.reviewId);
    sideMeal.sideMealsReviews.splice(index, 1);
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};