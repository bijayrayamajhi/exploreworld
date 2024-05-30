const express = require("express");
const router = express.Router({mergeParams: true});
const asyncWrap = require("../utils/asyncWrap.js");
const { validateReview, isLoggedIn ,isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

  // post review route

  router.post("/",validateReview, isLoggedIn, asyncWrap (reviewController.createReview));

  //delete review route

  router.delete("/:reviewId", isLoggedIn, isReviewAuthor,  asyncWrap(reviewController.destroyReview));

  module.exports = router ;