const Meal = require("../models/meal");
const Meat = require("../models/meat");
const Review = require("../models/review");

module.exports.index = async(req, res) => {
    // const meal = new Meal();
    // meal.mealName = 'Arise'
    // meal.save();
    //this is how to insert some dummy data to mongo
    const meals = await Meal.find({});
    // res.render("meals/index", { meals });
    res.send(meals);
};

module.exports.deleteMeal = async(req, res) => {
    //const { id } = req.params;
    const id = "617eba66174386a21c2716c8";
    await Meal.findByIdAndDelete(id);
    //req.flash('success', 'Successfully deleted meal!')
    res.send("success");
};

module.exports.updateMeal = async(req, res) => {
    //const { id } = req.params;
    const id = "617fc117314b975934605db2";
    const updatedName = "updatedNAME";
    const isExist = await Meal.findById(id);
    if (isExist) {
        const meal = await Meal.findByIdAndUpdate(id, { mealName: updatedName });
        res.send("User Update Successfully", meal);
    } else {
        res.send("couldnt find that user");
    }
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
    res.redirect(`/meals/${meal._id}`);
};

module.exports.createMeal = async(req, res) => {
    /*
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
    */

    const meal = new Meal();
    meal.mealName = "bdika";
    meal.mealSummary = "Lo Yodea";
    meal.mealTotalPrice = "100";

    await meal.save();
    res.send(meal);
    //req.flash('success', 'successfully made a new meal!')
    //res.redirect(`/meals/${meal._id}`);
};

module.exports.renderRecommendedMeals = async(req, res) => {
    const meals = await Meal.find({ mealIsRecommended: true });
    res.render("meals/index", { meals });
};

module.exports.mealById = async(req, res) => {
    const meal = await Meal.findById(req.params.id);
    res.send(meal);
};