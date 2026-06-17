const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsyn.js");
const {listingSchema}=require("../schema.js"); 
const ExpressError=require("../utils/ExpressErrors.js");
const Listing =require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body); 
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
 };

router.get("/",wrapAsync(async (req,res,next)=>{
    const allListing=  await Listing.find({}); 
   res.render("listings/index.ejs",{allListing});   
}));
router.get("/new", isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs");
});
router.post("/",
    isLoggedIn,
    validateListing,wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.Listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");  
})
); 

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    const allData=await Listing.findById(id).populate("reviews");
    if(!allData){
        req.flash("error","Listing not found!");
        res.redirect("/listings");
    }
   else  res.render("listings/show.ejs",{allData});
}));

router.get("/:id/update",isLoggedIn,
    wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list){
        req.flash("error","Listing not found!");
        res.redirect("/listings");
    }
    else res.render("listings/update.ejs",{list});
}));

router.put("/:id",
    isLoggedIn,
    validateListing,wrapAsync( async(req,res,next)=>{
    let {id}=req.params;
         await Listing.findByIdAndUpdate(id,{...req.body.Listing},{ returnDocument:'after', runValidators: true });
          req.flash("success","Listing Updated!");
         res.redirect(`/listings/${id}`);
})
);

 router.delete("/:id",
    isLoggedIn,
    wrapAsync(async(req,res,next)=>{
         let {id}=req.params;
         await Listing.findByIdAndDelete(id);
         req.flash("success","Listing Deleted!");
         res.redirect("/listings");
 })
); 

module.exports=router;