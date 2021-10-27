const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const sideMealScema = new Schema({
  sideMealName: String,
  sideMealSummary: String,
  sideMealDifficult: Number,
  sideMealEstimatedPrice: Number,
  sideMealsAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sideMealsReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  sideMealImageUrl: [ImageSchema],
  sideMealIngriedents: String,
  sideMealPreperationDescription: String,
  sideMealPreperationEstimatedTime: String,
  sideMealnumberOfPeopleItSuits: String,
});

module.exports = mongoose.model("SideMeal", sideMealScema);
