const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsyn.js");
const {listingSchema}=require("../schema.js"); 
const ExpressError=require("../utils/ExpressErrors.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");

router.get("/",wrapAsync(listingController.index));
router.get("/new", isLoggedIn,listingController.render_new_form);
router.post("/",
    isLoggedIn,
    validateListing,wrapAsync(listingController.postListing)
); 

router.get("/:id",wrapAsync(listingController.showListing));

router.get("/:id/update",isLoggedIn,
    isOwner,  
    wrapAsync(listingController.render_update_form));

router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,wrapAsync(listingController.updateListing)
);

 router.delete("/:id",
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.deleteListing)
); 

module.exports=router;