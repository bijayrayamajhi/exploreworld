const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review) ;         // here review is a object with keys rating and comments(defined in show.ejs) 
    newReview.author = req.user._id ;
    listing.reviews.push(newReview);                        // to store objectId of newReview in parent document i.e. Listing

    await listing.save();
    await newReview.save();

    req.flash("success", "new review added");
 
    res.redirect(`/listings/${id}`);
  };
  

module.exports.destroyReview = async(req,res) => {
    const{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});   //Delete the object id from reviews array which is match to reviewId
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");

    res.redirect(`/listings/${id}`);
  };