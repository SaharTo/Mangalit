const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewBody: String,
    reviewRating: Number,
    reviewAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
            /*   populate method - Population is the 
                      process of automatically replacing the specified paths in the document with document(s) 
                      from other collection(s).
              */
    },
    // reviewAuthor: String,
});

module.exports = mongoose.model("Review", reviewSchema);