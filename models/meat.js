const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200");
});

const meatScema = new Schema({
    meatType: String,
    meatName: String,
    meatDescription: String,
    meatNumber: String,
    meatPricePerOneKg: String,
    meatImage: [ImageSchema],
});

module.exports = mongoose.model("Meat", meatScema);