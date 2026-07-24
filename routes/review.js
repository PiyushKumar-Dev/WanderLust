const express=require('express');
const router=express.Router({mergeParams:true });
const wrapAsync=require("../utils/wrapAsyn.js");
const ExpressError=require("../utils/ExpressErrors.js");
const Review=require("../models/review.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const ReviewController=require("../controllers/review.js");
router.post("/",isLoggedIn,validateReview,wrapAsync(ReviewController.postReview));

router.delete("/:revId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(ReviewController.deleteReview));

module.exports=router;