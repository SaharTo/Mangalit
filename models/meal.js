const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealScema = new Schema({
    mealName: String,
    mealSummary: String,
    mealMeatInfo: [{
        type: Schema.Types.ObjectId,
        ref: "Meat",
    }, ],
    mealPreparationTechniques: String,
    mealPreparationTime: Number,
    mealPreparationDifficult: String,
    mealNumberOfPeopleItSuits: Number,
    mealRecommendedSideMeals: [{
        type: Schema.Types.ObjectId,
        ref: "SideMeal",
    }, ],
    mealImage: [String],
    mealMeatQuantityGram: Number,
    mealAdditionalIngredients: String,
    mealTotalPrice: Number,
    mealDescription: String,
    mealAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mealReviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    mealIsRecommended: Boolean,
    mealLikes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
});

module.exports = mongoose.model("Meal", mealScema);