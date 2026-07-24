const express=require('express');
const router=express.Router({mergeParams:true });
const User=require("../models/user.js"); 
const wrapAsync=require("../utils/wrapAsyn.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const UserController=require("../controllers/users.js");

router.get("/signup",UserController.renderSignUpForm);
router.post("/signup",wrapAsync(UserController.signUp));

router.get("/login",UserController.renderLoginForm);

 router.post("/login",saveRedirectUrl,
    passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),UserController.Login);

router.get("/logout",UserController.renderLogout);
router.post("/logout",UserController.logout);
module.exports=router; 