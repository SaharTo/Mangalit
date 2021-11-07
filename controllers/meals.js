const Meal = require("../models/meal");
const Meat = require("../models/meat");
const Review = require("../models/review");

module.exports.index = async(req, res) => {
    const meals = await Meal.find({});
    // res.render("meals/index", { meals });
    res.send(meals);
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
    const meal = await Meal.findByIdAndUpdate(id, { $set: req.body }, { new: true })
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
    console.log(req.body);

    const meal = await new Meal(req.body);
    try {
        /*meal.mealImage = req.files.map((f) => ({
          url: f.path,
          filename: f.filename,
        }));
        meal.mealAuthor = req.user._id;
        meal.mealReviews = [];
        meal.mealRecommendedSideMeals = []; the user could choose 0-3 sideMeals when add a new Meal, so it will inserted automatically via req.body
        meal.mealIsRecommended = false;*/
        //trying to fetch the meat price from the Meat collection where the id is suits to the meat id in the meal.
        /*const { estMeatPrice } = await Meat.findById(req.body.meal.mealMeatInfo);
        meal.mealEstimatedMeatPrice = estMeatPrice;*/

        await meal.save();
        console.log(meal);
        res.send(meal);
    } catch (e) {
        console.log(e);
    }
    /*const meal = new Meal();
    meal.mealName = "bdika";
    meal.mealSummary = "Lo Yodea";
    meal.mealTotalPrice = "100";

    await meal.save();
    res.send(meal);
    This is work*/
    //req.flash('success', 'successfully made a new meal!')
    //res.redirect(`/meals/${meal._id}`);
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
                select: 'fullName',
            },
        })
        .populate("mealAuthor", "fullName");
    if (!meal) {
        res.send("Cannot find that meal");
    }
    res.send(meal);
};