const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const mealScema = new Schema({
  mealName: String,
  mealSummary: String,
  mealMeatInfo: {
    type: Schema.Types.ObjectId,
    ref: "Meat",
  },
  mealPreparationTechniques: String,
  mealPreparationTime: Number,
  mealPreparationDifficult: Number,
  mealNumberOfPeopleItSuits: Number,
  mealRecommendedSideMeals: [
    {
      type: Schema.Types.ObjectId,
      ref: "SideMeal",
    },
  ],

  mealImageUrl: [ImageSchema],
  mealMeatQuantityGram: Number,
  mealEstimatedMeatPrice: Number,
  mealAdditionalIngredients: String,
  mealAdditionalsIngredientsPrice: Number,
  mealTotalPrice: Number,
  mealDescription: String,
  mealAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mealReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Meal", mealScema);
