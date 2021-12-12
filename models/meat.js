const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const meatScema = new Schema({
    meatType: String,
    meatName: String,
    meatDescription: String,
    meatNumber: String,
    //meatPricePerOneKg: String,
    meatImage: [String],
});

module.exports = mongoose.model("Meat", meatScema);