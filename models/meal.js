const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200");
});

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
    mealImage: [],
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