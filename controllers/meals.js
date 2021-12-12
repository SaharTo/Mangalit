const Meal = require("../models/meal");
const Meat = require("../models/meat");
const Review = require("../models/review");
const uploadImg = require("../helpers/uploadImg")

module.exports.index = async(req, res) => {
    const meals = await Meal.find({});
    // res.render("meals/index", { meals });
    res.send(meals);
};

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
    console.log("backend roulette data ");
    res.send(rndMeals);
};

module.exports.deleteMeal = async(req, res) => {
    console.log("mitzi");
    const { id } = await req.params;
    console.log(id);
    //const id = "617eba66174386a21c2716c8";
    try {
        await Meal.findByIdAndDelete(id);
        res.send("delete success");
    } catch (e) {
        console.log(e);
    }
};

module.exports.updateMeal = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const meal = await Meal.findByIdAndUpdate(
        id, { $set: req.body.meal }, { new: true }
    );
    console.log("SUCCESS: " + meal);
    res.send(meal);
};
//const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
//Meal.mealImage.push(...imgs);
//await meal.save();
//we should make sure that there is option to delete images from edited meals
/*if (req.body.deleteImages) { 
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        
    }
    */
// req.flash('success', 'successfully updated meal!');
//res.redirect(`/meals/${meal.__id}`);

module.exports.createMeal = async(req, res) => {
    console.log('body', req.body.meal);
    const meal = await new Meal(req.body.meal);
    try {
        if (req.session.user) meal.mealAuthor = req.session.user._id;
        //meal.mealAuthor = req.session.user._id;
        meal.mealImage = meal.mealImage.map(async(f) => {
            console.log('f', f);
            const res = await uploadImg(f)
            console.log('res', res);
            return res.url
        })
        await meal.save();
        console.log(meal);
        res.send(meal);
    } catch (e) {
        console.log(e);
    }
};

module.exports.renderRecommendedMeals = async(req, res) => {
    const meals = await Meal.find({ mealIsRecommended: true });
    res.render("meals/index", { meals });
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
        .populate("mealImage", "url")
        .populate("mealAuthor", "fullName");
    if (!meal) {
        res.send("Cannot find that meal");
    }
    res.send(meal);
};

module.exports.addReview = async(req, res) => {
    console.log("add review", req.body);
    const meal = await Meal.findById(req.params.id);
    const review = new Review(req.body.review);
    review.reviewAuthor = req.session.user._id;
    await review.save();
    meal.mealReviews.push(review);
    await meal.save();
    res.redirect(`http://localhost:3000/meals/${req.params.id}`);
    // res.send("add meal review");
};

module.exports.deleteReview = async(req, res) => {
    const meal = await Meal.findById(req.params.id);
    await Review.findByIdAndDelete(req.params.reviewId);
    const index = meal.mealReviews.indexOf(req.params.reviewId);
    meal.mealReviews.splice(index, 1);
    await meal.save();
    res.send("delete meal review");
};