const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealScema = new Schema({
    mealName: String,
    mealSummary: String,
    mealMeatInfo: [{
        type: Schema.Types.ObjectId,
        ref: "Meat",
    }, ],
    //mealMeatInfo: String,
    mealPreparationTechniques: String,
    mealPreparationTime: Number,
    mealPreparationDifficult: String,
    mealNumberOfPeopleItSuits: Number,
    mealRecommendedSideMeals: [{
        type: Schema.Types.ObjectId,
        ref: "SideMeal",
    }, ],
    // mealRecommendedSideMeals: String,
    mealImage: [String],
    mealMeatQuantityGram: Number,
    //mealEstimatedMeatPrice: Number,
    mealAdditionalIngredients: String,
    //mealAdditionalsIngredientsPrice: Number,
    mealTotalPrice: Number,
    mealDescription: String,
    mealAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // mealAuthor: String,
    mealReviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    // mealReviews: String,
    mealIsRecommended: Boolean,
});

module.exports = mongoose.model("Meal", mealScema);