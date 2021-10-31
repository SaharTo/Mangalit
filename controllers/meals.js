const Meal = require("../models/meal");
const Meat = require("../models/meat");
const Review = require("../models/review");

module.exports.renderNewForm = (req, res) => {
    res.render("meals/new");
};

module.exports.index = async(req, res) => {
    const meal = new Meal();
    meal.mealName = 'Arise'
        // meal.save();
    const meals = await Meal.find({});
    // res.render("meals/index", { meals });
    res.send(meals)
};

module.exports.renderEditForm = async(req, res) => {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
        //req.flash('error', 'Cannot find that meal!');
        return res.redirect("/meals");
    }
    res.render("meals/edit", { meal });
};

module.exports.deleteMeal = async(req, res) => {
    const { id } = req.params;
    await Meal.findByIdAndDelete(id);
    //req.flash('success', 'Successfully deleted meal!')
    res.redirect("/meals");
};

module.exports.updateMeal = async(req, res) => {
    const { id } = req.params;
    const meal = await Meal.findByIdAndUpdate(id, {...req.body.meal });
    const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    Meal.mealImage.push(...imgs);
    await meal.save();
    //we should make sure that there is option to delete images from edited meals
    /*if (req.body.deleteImages) { 
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        
    }
    */
    // req.flash('success', 'successfully updated meal!');
    res.redirect(`/meals/${meal._id}`);
};

module.exports.createMeal = async(req, res) => {
    const meal = new Meal(req.body.meal);
    meal.mealImage = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    meal.mealAuthor = req.user._id;
    meal.mealReviews = [];
    meal.mealRecommendedSideMeals = [];
    meal.mealIsRecommended = false;
    //trying to fetch the meat price from the Meat collection where the id is suits to the meat id in the meal.
    const { estMeatPrice } = await Meat.findById(req.body.meal.mealMeatInfo);
    meal.mealEstimatedMeatPrice = estMeatPrice;
    await meal.save();
    console.log(meal);
    //req.flash('success', 'successfully made a new meal!')
    res.redirect(`/meals/${meal._id}`);
};

module.exports.renderRecommendedMeals = async(req, res) => {
    const meals = await Meal.find({ mealIsRecommended: true });
    res.render("meals/index", { meals });
};

module.exports.showMeal = async(req, res) => {
    const meal = await Meal.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    if (!Meal) {
        console.log("error, meal is not found");
        // req.flash("error", "Cannot find that meal!");
        return res.redirect("/meals");
    }
    //res.render("meals/show", { meal }); // here we need to render our react meal component and to add the meal obj
    //so we could use it later at the frontend
};