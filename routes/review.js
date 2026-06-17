const express=require('express');
const router=express.Router({mergeParams:true });
const wrapAsync=require("../utils/wrapAsyn.js");
const ExpressError=require("../utils/ExpressErrors.js");
const {reviewSchema}=require("../schema.js"); 
const Review=require("../models/review.js");
const Listing =require("../models/listing.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body); 
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
 };

router.post("/",validateReview,wrapAsync(async(req,res)=>{
     let listing=await Listing.findById(req.params.id);
      let newReview=new Review(req.body.review);
      listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","Review Added!");

     res.redirect(`/listings/${listing._id}`);
}));

router.delete("/:revId",wrapAsync(async(req,res)=>{
    let{id,revId}=req.params;
     await Listing.findByIdAndUpdate(id,{$pull:{reviews:revId}});
    await Review.findByIdAndDelete(revId);
    req.flash("success","Review Deleted!");  
    res.redirect(`/listings/${id}`);
}));

module.exports=router;