const Meal = require("../models/meal");

module.exports.renderNewForm = (req, res) => {
  res.render("meals/new");
};

module.exports.index = async (req, res) => {
  const meals = await Meal.find({});
  res.render("meals/index", { meals });
};

module.exports.renderEditForm = async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (!meal) {
    //req.flash('error', 'Cannot find that meal!');
    return res.redirect("/meals");
  }
  res.render("meals/edit", { meal });
};

module.exports.deleteMeal = async (req, res) => {
  const { id } = req.params;
  await Meal.findByIdAndDelete(id);
  //req.flash('success', 'Successfully deleted meal!')
  res.redirect("/meals");
};

module.exports.updateMeal = async (req, res) => {};

module.exports.createMeal = async (req, res) => {};

module.exports.renderRecommendedMeals = async (req, res) => {};

module.exports.showMeal = async (req, res) => {
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
