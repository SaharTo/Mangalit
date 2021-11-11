const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200");
});

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
    sideMealImageUrl: [ImageSchema],
    sideMealIngriedents: String,
    sideMealPreperationDescription: String,
    sideMealPreperationEstimatedTime: Number,
    sideMealnumberOfPeopleItSuits: Number,
});

module.exports = mongoose.model("SideMeal", sideMealScema);