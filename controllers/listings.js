const Listing = require("../models/listing");



module.exports.index =async (req,res,next)=>{
    const allListing=  await Listing.find({}); 
   res.render("listings/index.ejs",{allListing});   
}


module.exports.render_new_form=async (req,res,next)=>{
    res.render("listings/new.ejs");
    }

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const allData=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if(!allData){ 
        req.flash("error","Listing not found!");
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{allData});
  
};

module.exports.postListing=async(req,res,next)=>{
    const newListing=new Listing(req.body.Listing);
    newListing.owner = req.user._id;  
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");  
};

module.exports.render_update_form=async(req,res,next)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list){
        req.flash("error","Listing not found!");
        res.redirect("/listings");
    }
    else res.render("listings/update.ejs",{list});
};

module.exports.updateListing= async(req,res,next)=>{
    let {id}=req.params;
         await Listing.findByIdAndUpdate(id,{...req.body.Listing},{ returnDocument:'after', runValidators: true });
        req.flash("success","Listing Updated!");
         res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req,res,next)=>{
         let {id}=req.params;
         await Listing.findByIdAndDelete(id);
         req.flash("success","Listing Deleted!");
         res.redirect("/listings");
 };