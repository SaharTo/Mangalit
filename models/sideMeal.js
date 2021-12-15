const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sideMealScema = new Schema({
    sideMealName: String,
    sideMealSummary: String,
    sideMealDifficult: String,
    sideMealEstimatedPrice: Number,
    sideMealsAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    sideMealsReviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    sideMealImageUrl: [String],
    sideMealIngriedents: String,
    sideMealPreperationDescription: String,
    sideMealPreperationEstimatedTime: Number,
    sideMealnumberOfPeopleItSuits: Number,
    sideMealLikes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
});

module.exports = mongoose.model("SideMeal", sideMealScema);