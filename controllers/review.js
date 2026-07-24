const Review=require("../models/review.js");
const Listing =require("../models/listing.js");


module.exports.postReview=async(req,res)=>{
     let listing=await Listing.findById(req.params.id);
      let newReview=new Review(req.body.review);
      newReview.author=res.locals.currentUser._id;
      listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","Review Added!");
     res.redirect(`/listings/${listing._id}`);
};
module.exports.deleteReview=async(req,res)=>{
    let{id,revId}=req.params;
     await Listing.findByIdAndUpdate(id,{$pull:{reviews:revId}});
    await Review.findByIdAndDelete(revId);
    req.flash("success","Review Deleted!");  
    res.redirect(`/listings/${id}`);
};