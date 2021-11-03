const Review = require("../models/review");
/*functions that handle the create and delete reviews calls on the DB (createReview, deleteReview)
In this controller we are not handling the reviews render because it's will render automatically on the meal page.
In addition, we should make sure that each meal schema have a review object that contains an array of all the reviews
of a specific meal.. :)*/

module.exports.reviewIndex = async(req, res) => {
    const reviews = await Review.find({});
    res.send(reviews);
}
module.exports.deleteReview = async(req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect(`/reviews/`);

}
module.exports.createReview = async(req, res) => {
    const review = new Review(req.body);
    // const review = new Review(req.body.Review);
    if (req.user) {
        review.reviewAuthor = req.user._id;
    }
    await review.save();
    res.redirect(`/reviews/`);
}