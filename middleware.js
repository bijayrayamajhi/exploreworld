const asyncWrap = require("./utils/asyncWrap");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const listingValidation= require("./listingValidation.js");
const reviewValidation= require("./reviewValidation.js");

// check whether the user is logged in or not

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl ;  // saving the url where user want to explore if user is not logged in or not authenticated.
        req.flash("error", "You are not logged in");
        return res.redirect("/login");
    };
    next();
};

// saving redirectUrl to the locals because passport reset the session information after logged in.

module.exports.saveRedirectUrl = (req,res,next) => {
    if( req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();     
};

// authorize the owner of listing

module.exports.isOwner = asyncWrap(async(req,res,next) => {
    let { id } = req.params ;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error", "you don't have permission to make changes");
        return res.redirect(`/listings/${id}`);
    };
    next();
});

//authorize the author of review

module.exports.isReviewAuthor = asyncWrap(async(req,res,next) => {
    let { id, reviewId } = req.params ;
    const review = await Review.findById(reviewId);
    if(! review.author._id.equals(res.locals.currentUser._id)){
        req.flash("error", "you dont have permission to delete this review");
        return res.redirect(`/listings/${id}`);
    };
    next();
});

// validate listing schema

module.exports.validateSchema = (req, res, next) => {
    const { error, value } = listingValidation.validate(req.body);

    if (error) {
        console.error(error);
        throw new ExpressError(400, error); 
    } else {
        req.body = value;
        next();
    }
};

//validate review schema

module.exports.validateReview = (req, res, next) => {
    const { error, value } = reviewValidation.validate(req.body);
  
    if (error) {
        console.error(error);
        throw new ExpressError(400, "invalid data!"); 
    } else {
        req.body = value;
        next();
    }
  };
